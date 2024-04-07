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
import { zkBagContract } from '@/constants/zksend';
import { useNetwork } from '@/context/network';
import { throwTXIfNotSuccessful } from '@/utils';

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
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
        contract: network === Network.TESTNET ? zkBagContract : undefined,
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
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    link: ZkSendLink,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount) return;

    const transactionBlock = link.createClaimTransaction(
      currentAccount.address,
      { reclaim: true }
    );

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
