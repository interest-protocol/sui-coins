import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { throwTXIfNotSuccessful } from '@/utils';

import { ObjectField } from '../incinerator.types';

export const useBurn = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    objects: ReadonlyArray<ObjectField>,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');

    const txb = new TransactionBlock();

    txb.transferObjects(
      objects.map(({ objectId }) => objectId),
      txb.pure.address('0x0')
    );

    const { transactionBlockBytes, signature } =
      await signTransactionBlock.mutateAsync({
        transactionBlock: txb,
      });

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature,
      requestType: 'WaitForLocalExecution',
      options: {
        showEffects: true,
      },
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx);
  };
};
