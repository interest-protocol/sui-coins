import {
  DevInspectResults,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { head, propOr } from 'ramda';

import { SignAndExecuteArgs } from './tx.types';

export const throwTXIfNotSuccessful = (
  tx: SuiTransactionBlockResponse,
  callback?: () => void
) => {
  if (!!tx.effects?.status && tx.effects.status.status !== 'success') {
    callback?.();
    throw new Error();
  }
};

export const getReturnValuesFromInspectResults = (
  x: DevInspectResults
): Array<[number[], string]> | null => {
  const results = propOr([], 'results', x) as DevInspectResults['results'];

  if (!results?.length) return null;

  const firstElem = head(results);

  if (!firstElem) return null;

  const returnValues = firstElem?.returnValues;

  return returnValues ? returnValues : null;
};

export const signAndExecute = async ({
  txb,
  options,
  suiClient,
  currentAccount,
  signTransactionBlock,
}: SignAndExecuteArgs) => {
  txb.setSender(currentAccount.address);

  const { signature, transactionBlockBytes } =
    await signTransactionBlock.mutateAsync({
      transactionBlock: txb,
      account: currentAccount,
    });

  return suiClient.executeTransactionBlock({
    transactionBlock: transactionBlockBytes,
    signature,
    options: {
      showEffects: true,
      ...options,
    },
    requestType: 'WaitForLocalExecution',
  });
};
