import { CoinMetadata, CoinStruct, SuiClient } from '@mysten/sui.js/client';

export interface ICoinResponse {
  digest: string;
  version: string;
  coinType: string;
  balance: string;
  coinObjectId: string;
  owned: string | null;
  previousTransaction: string;
  objects: ReadonlyArray<CoinStruct>;
  lockedUntilEpoch?: number | null | undefined;
}

export type TCoinWithMetadata = CoinMetadata & ICoinResponse;

export type TUseGetAllCoinsWithMetadata = () => {
  coins: ReadonlyArray<TCoinWithMetadata>;
  isLoading: boolean;
  error: string | null;
};

export type TGetAllCoins = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<CoinStruct>>;

export type TGetOwned = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<{ type: string; objectId: string }>>;
