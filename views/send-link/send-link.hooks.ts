import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/dist/cjs/client';
import { ZkSendLink } from '@mysten/zksend';

import { useNetwork } from '@/context/network';
import { throwTXIfNotSuccessful } from '@/utils';

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

    fetch(`/api/v1/zksend?network=${network}&id=${id}&link=${url}`, {
      method: 'DELETE',
    });

    onSuccess(tx);
  };
};
