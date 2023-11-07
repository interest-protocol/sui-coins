import { CoinMetadata, CoinStruct, SuiClient } from '@mysten/sui.js/client';

export interface ICoinResponse {
  version: string;
  digest: string;
  coinType: string;
  previousTransaction: string;
  coinObjectId: string;
  balance: string;
  owned: boolean;
  lockedUntilEpoch?: number | null | undefined;
  objects: ReadonlyArray<CoinStruct>;
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

export type TGetOwnedTypes = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<string>>;
