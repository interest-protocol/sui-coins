import { JsonRpcProvider } from '@mysten/sui.js';
import { CoinStruct } from '@mysten/sui.js/src/types/coin';

export interface ICoinResponse {
  version: string;
  digest: string;
  coinType: string;
  previousTransaction: string;
  coinObjectId: string;
  balance: string;
  lockedUntilEpoch?: number | null | undefined;
  objects: ReadonlyArray<CoinStruct>;
}

export interface ICoinMetadata {
  symbol: string;
  id: string | null;
  description: string;
  name: string;
  decimals: number;
  iconUrl: string | null;
}

export type TCoinWithMetadata = ICoinMetadata & ICoinResponse;

export type TUseGetAllCoinsWithMetadata = () => {
  coins: ReadonlyArray<TCoinWithMetadata>;
  isLoading: boolean;
  error: string | null;
};

export type TGetAllCoins = (
  provider: JsonRpcProvider,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<CoinStruct>>;
