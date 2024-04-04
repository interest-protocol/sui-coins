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
import { useNetwork } from '@/context/network';
import { throwTXIfNotSuccessful } from '@/utils';

import { ZkSendLinkItem } from './send-history.types';

export const useLinkList = (
  currentCursor: string,
  updateList: (
    links: ReadonlyArray<ZkSendLinkItem>,
    hasNextPage: boolean,
    cursor: string | null
  ) => void
) => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return useSWR(
    `${network}-${currentAccount?.address}-${suiClient}`,
    async () => {
      if (!currentAccount || !suiClient) return;

      const { links, hasNextPage, cursor } = await listCreatedLinks({
        client: suiClient,
        address: currentAccount.address,
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
        ...(currentCursor && { cursor: currentCursor }),
      });

      updateList(links, hasNextPage, cursor);

      return hasNextPage;
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

    fetch(`/api/v1/zksend?network=${network}&digest=${digest}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        link: [url],
        digest: tx.digest,
      }),
    });

    onSuccess(tx, id);
  };
};
