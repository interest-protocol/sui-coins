import { SuiClient, SuiObjectResponse } from '@mysten/sui.js/client';

import { CoinObject } from '../use-get-all-coins/use-get-all-coins.types';

export type TGetAllObjects = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<SuiObjectResponse>>;

export interface ObjectData {
  type: string;
  objectId: string;
  display?: Record<string, string> | CoinObject | undefined | null;
}
