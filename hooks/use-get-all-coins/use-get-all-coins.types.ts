import { CoinMetadata, CoinStruct, SuiClient } from '@mysten/sui.js/client';

export interface CoinObject {
  digest: string;
  version: string;
  coinType: string;
  balance: string;
  type: string;
  symbol: string;
  coinObjectId: string;
  previousTransaction: string;
  objects: ReadonlyArray<CoinStruct>;
  lockedUntilEpoch?: number | null | undefined;
  metadata: CoinMetadata;
}

export type CoinsMap = Record<string, CoinObject>;

export type TGetAllCoins = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<CoinStruct>>;
