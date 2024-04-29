import {
  DevInspectResults,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { head, propOr } from 'ramda';

import { CoinsMap } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { FixedPointMath } from '@/lib';

import { isSui } from '../coin';
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
  suiClient,
  currentAccount,
  txb,
  signTransactionBlock,
  options,
}: SignAndExecuteArgs) => {
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

export const getSpecificCoinAmount =
  ({
    type,
    value,
    decimals,
  }: {
    type: string;
    value: string;
    decimals: number;
  }) =>
  (tx: TransactionBlock, coinsMap: CoinsMap) => {
    if (isSui(type)) {
      const coinOut = tx.splitCoins(tx.gas, [
        tx.pure(
          FixedPointMath.toBigNumber(value, decimals)
            .decimalPlaces(0)
            .toString()
        ),
      ]);

      return coinOut;
    }

    if (coinsMap[type].objects.length > 1)
      tx.mergeCoins(
        tx.object(coinsMap[type].objects[0].coinObjectId),
        coinsMap[type].objects
          .slice(1)
          .map((object) => tx.object(object.coinObjectId))
      );

    const coinOut = tx.splitCoins(
      tx.object(coinsMap[type].objects[0].coinObjectId),
      [
        tx.pure(
          FixedPointMath.toBigNumber(value, decimals)
            .decimalPlaces(0)
            .toString()
        ),
      ]
    );

    return coinOut;
  };
