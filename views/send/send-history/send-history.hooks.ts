import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/dist/cjs/client';
import { ZkSendLink } from '@mysten/zksend';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { throwTXIfNotSuccessful } from '@/utils';

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
        link: url,
        digest: tx.digest,
      }),
    });

    onSuccess(tx, id);
  };
};
