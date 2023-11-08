import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';

export const throwTXIfNotSuccessful = (tx: SuiTransactionBlockResponse) => {
  if (!!tx.effects?.status && tx.effects.status.status !== 'success')
    throw new Error();
};
