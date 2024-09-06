import {
  OwnedObjectRef,
  SuiTransactionBlockResponse,
} from '@mysten/sui/client';

import { TimedSuiTransactionBlockResponse } from '@/interface';

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
}: SignAndExecuteArgs): Promise<TimedSuiTransactionBlockResponse> => {
  const { signature, bytes } = await signTransaction.mutateAsync({
    account: currentAccount,
    transaction: tx,
  });

  const startTime = Date.now();

  const txResult = await suiClient.executeTransactionBlock({
    transactionBlock: bytes,
    signature,
    options: {
      showEffects: true,
      ...options,
    },
    requestType: 'WaitForLocalExecution',
  });

  return {
    ...txResult,
    time: Date.now() - startTime,
  };
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

export const getObjectIdsFromTxResult = (
  txResult: TimedSuiTransactionBlockResponse,
  field: 'created' | 'mutated'
) =>
  txResult.effects?.[field]!.map(
    (item: OwnedObjectRef) => item.reference.objectId
  );
