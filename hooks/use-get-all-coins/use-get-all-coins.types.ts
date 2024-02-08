import { CoinMetadata, CoinStruct, SuiClient } from '@mysten/sui.js/client';

export interface CoinObject extends Pick<CoinMetadata, 'symbol' | 'decimals'> {
  digest?: string;
  version?: string;
  type: string;
  balance: string;
  coinObjectId: string;
  previousTransaction?: string;
  lockedUntilEpoch?: number | null | undefined;
  metadata: Omit<CoinMetadata, 'symbol' | 'decimals'>;
  objects: ReadonlyArray<Omit<CoinStruct, 'coinType'> & { type: string }>;
}

export type CoinsMap = Record<string, CoinObject>;

export type TGetAllCoins = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<CoinStruct>>;
