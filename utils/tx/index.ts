import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { always, ifElse, isNil, toString } from 'ramda';

import { CreateVectorParameterArgs } from './tx.types';
export const makeSWRKey = (
  args: ReadonlyArray<unknown>,
  methodName: string
): string =>
  args
    .map(ifElse(isNil, always(''), toString))
    .concat([methodName])
    .join('|');

export const throwTXIfNotSuccessful = (
  tx: SuiTransactionBlockResponse,
  callback?: () => void
) => {
  if (!!tx.effects?.status && tx.effects.status.status !== 'success') {
    callback?.();
    throw new Error();
  }
};

export const createObjectsParameter = ({
  txb,
  type,
  coinsMap,
  amount,
}: CreateVectorParameterArgs) => {
  if (type === SUI_TYPE_ARG) {
    const [coin] = txb.splitCoins(txb.gas, [txb.pure(amount.toString())]);
    return [coin];
  }

  return coinsMap[type]
    ? coinsMap[type].objects.map((x) => txb.object(x.coinObjectId))
    : [];
};
