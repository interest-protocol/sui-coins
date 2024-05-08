import { SuiClient, SuiObjectResponse } from '@mysten/sui.js/client';

import { CoinObject } from '../../hooks/use-get-all-coins/use-get-all-coins.types';

export type TGetAllObjects = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<SuiObjectResponse>>;

interface BaseObjectData {
  type: string;
  objectId: string;
  display?: Record<string, string> | undefined | null;
}

export interface AllCoins {
  ownedNfts: ReadonlyArray<ObjectData>;
  coinsObjects: ReadonlyArray<ObjectData>;
  otherObjects: ReadonlyArray<ObjectData>;
}

export interface CoinObjectData extends Omit<BaseObjectData, 'display'> {
  display: CoinObject;
}

export type ObjectData = BaseObjectData | CoinObjectData;
