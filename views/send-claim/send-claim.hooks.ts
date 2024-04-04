import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { ZkSendLink } from '@mysten/zksend';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { ZkSendLinkData } from '@/interface';
import { throwTXIfNotSuccessful } from '@/utils';

import { ZkSendLinkWithUrl } from './send-claim.types';

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

export const useClaimLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    { url, link }: ZkSendLinkWithUrl,
    id: string,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount || !link || !link.keypair) return;

    const transactionBlock = link.createClaimTransaction(
      currentAccount.address
    );

    transactionBlock.setGasOwner(currentAccount.address);

    const { signature, transactionBlockBytes } =
      await signTransactionBlock.mutateAsync({
        transactionBlock,
      });

    const { signature: sponsorSignature } =
      await link.keypair.signTransactionBlock(
        await TransactionBlock.from(transactionBlockBytes).build()
      );

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature: [signature, sponsorSignature],
    });

    throwTXIfNotSuccessful(tx);

    await fetch(`/api/v1/zksend?network=${network}&id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        link: encodeURI(url),
      }),
    });

    onSuccess(tx);
  };
};
