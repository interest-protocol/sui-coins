import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/dist/cjs/client';
import { ZkSendLink } from '@mysten/zksend';

import { throwTXIfNotSuccessful } from '@/utils';

export const useReclaimLink = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    url: string | undefined,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount || !url) return;

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

    onSuccess(tx);
  };
};
