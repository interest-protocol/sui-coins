import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/dist/cjs/client';
import { listCreatedLinks, ZkSendLink } from '@mysten/zksend';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { Network } from '@/constants';
import { ZK_BAG_CONTRACT_IDS } from '@/constants/zksend';
import { useNetwork } from '@/context/network';
import { throwTXIfNotSuccessful } from '@/utils';
import { createClaimTransaction } from '@/utils/zk-send';

export const useLinkList = (currentCursor: string | null) => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return useSWR(
    `${network}-${currentAccount?.address}-${suiClient}-${currentCursor}`,
    async () => {
      if (!currentAccount || !suiClient) return;

      const { links, hasNextPage, cursor } = await listCreatedLinks({
        client: suiClient,
        host: '/send/link',
        path: location.origin,
        address: currentAccount.address,
        contract: ZK_BAG_CONTRACT_IDS[network],
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
        ...(currentCursor && { cursor: currentCursor }),
      });

      return { links, hasNextPage, cursor };
    }
  );
};

export const useRegenerateLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    link: ZkSendLink,
    digest: string,
    onSuccess: (tx: SuiTransactionBlockResponse, id: string) => void
  ) => {
    if (!currentAccount) return;

    const { url, transactionBlock } = await link.createRegenerateTransaction(
      currentAccount.address
    );

    const { transactionBlockBytes, signature } =
      await signTransactionBlock.mutateAsync({ transactionBlock });

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature,
    });

    throwTXIfNotSuccessful(tx);

    const id = v4();

    await fetch(`/api/v1/zksend?network=${network}&digest=${digest}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        links: [url],
        digest: tx.digest,
      }),
    });

    onSuccess(tx, id);
  };
};

export const useReclaimByLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    link: ZkSendLink,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount) return;

    const transactionBlock = createClaimTransaction({
      reclaim: true,
      address: currentAccount.address,
      sender: link.keypair!.toSuiAddress(),
      assets: link.assets,
      ...(network === Network.TESTNET && {
        contracts: ZK_BAG_CONTRACT_IDS[network],
      }),
    });

    const { transactionBlockBytes, signature } =
      await signTransactionBlock.mutateAsync({ transactionBlock });

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature,
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx);
  };
};
