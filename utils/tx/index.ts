import { SuiTransactionBlockResponse } from '@mysten/sui/client';

import { SignAndExecuteArgs, WaitForTxArgs } from './tx.types';

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

export const waitForTx = async ({
  suiClient,
  digest,
  timeout = 10000,
  pollInterval = 500,
}: WaitForTxArgs) =>
  suiClient.waitForTransaction({
    digest,
    timeout,
    pollInterval,
  });
