import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { ZkSendLink } from '@mysten/zksend';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { ZkSendLinkData } from '@/interface';
import { throwTXIfNotSuccessful } from '@/utils';

import { ZkSendLinkWithUrl } from './send-link.types';

export const useLinkWithUrl = (id: string, isClaiming: boolean) => {
  const network = useNetwork();

  return useSWR<ZkSendLinkWithUrl>(`${id}-${network}-${isClaiming}`, () =>
    fetch(`/api/v1/zksend?network=${network}&id=${id}`)
      .then((response) => response.json?.())
      .then(async (data: ZkSendLinkData) =>
        data.links[0]
          ? {
              url: data.links[0],
              link: await ZkSendLink.fromUrl(data.links[0]),
            }
          : { url: undefined, link: null }
      )
  );
};

export const useReclaimLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    url: string,
    id: string,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount) return;

    const link = await ZkSendLink.fromUrl(url);

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

    await fetch(`/api/v1/zksend?network=${network}&id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        link: encodeURI(url),
      }),
    });

    onSuccess(tx);
  };
};
