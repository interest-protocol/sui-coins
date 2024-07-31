import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { listCreatedLinks, ZkSendLink } from '@mysten/zksend';
import useSWR from 'swr';

import { Network } from '@/constants';
import { ZK_BAG_CONTRACT_IDS } from '@/constants/zksend';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { signAndExecute, throwTXIfNotSuccessful } from '@/utils';

export const useLinkList = (currentCursor: string | null) => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
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
        contract: ZK_BAG_CONTRACT_IDS[network as Network],
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
  const signTransaction = useSignTransaction();

  return async (
    link: ZkSendLink,
    onSuccess: (tx: TimedSuiTransactionBlockResponse, url: string) => void
  ) => {
    if (!currentAccount) return;

    const { url, transaction } = await link.createRegenerateTransaction(
      currentAccount.address
    );

    const tx = await signAndExecute({
      tx: transaction,
      signTransaction,
      suiClient,
      currentAccount,
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx, url);
  };
};
