import { SuiClient, SuiObjectResponse } from '@mysten/sui/client';

import { CoinObject } from '../coins-manager/coins-manager.types';

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

export interface AllObjects {
  ownedNfts: ReadonlyArray<ObjectData>;
  coinsObjects: ReadonlyArray<ObjectData>;
  otherObjects: ReadonlyArray<ObjectData>;
}

export interface CoinObjectData extends Omit<BaseObjectData, 'display'> {
  display: CoinObject;
}

export type ObjectData = BaseObjectData | CoinObjectData;
