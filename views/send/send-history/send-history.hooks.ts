import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { listCreatedLinks, ZkSendLink } from '@mysten/zksend';
import useSWR from 'swr';

import { Network } from '@/constants';
import { ZK_BAG_CONTRACT_IDS } from '@/constants/zksend';
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
        contract: ZK_BAG_CONTRACT_IDS[network],
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
        ...(currentCursor && { cursor: currentCursor }),
      });

      return { links, hasNextPage, cursor };
    }
  );
};

export const useRegenerateLink = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    link: ZkSendLink,
    onSuccess: (tx: SuiTransactionBlockResponse, url: string) => void
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
      requestType: 'WaitForLocalExecution',
      options: {
        showEffects: true,
        showBalanceChanges: true,
      },
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx, url);
  };
};
