import { SuiTransactionBlockResponse } from '@mysten/sui/client';

import { SignAndExecuteArgs } from './tx.types';

export const throwTXIfNotSuccessful = (
  tx: SuiTransactionBlockResponse,
  callback?: () => void
) => {
  if (!!tx.effects?.status && tx.effects.status.status !== 'success') {
    callback?.();
    throw new Error('Transaction failed');
  }
};

export const signAndExecute = async ({
  suiClient,
  currentAccount,
  tx,
  signTransaction,
  options,
}: SignAndExecuteArgs) => {
  const { signature, bytes } = await signTransaction.mutateAsync({
    transaction: tx,
    account: currentAccount,
  });

  return suiClient.executeTransactionBlock({
    transactionBlock: bytes,
    signature,
    options: {
      showEffects: true,
      ...options,
    },
    requestType: 'WaitForLocalExecution',
  });
};
