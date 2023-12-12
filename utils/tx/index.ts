import {
  DevInspectResults,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { head, propOr } from 'ramda';

export const throwTXIfNotSuccessful = (tx: SuiTransactionBlockResponse) => {
  if (!!tx.effects?.status && tx.effects.status.status !== 'success')
    throw new Error();
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
