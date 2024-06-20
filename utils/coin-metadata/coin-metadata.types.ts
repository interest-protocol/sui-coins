import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';

interface FetchCoinMetadataBaseArgs {
  network: Network;
}

export interface FetchCoinMetadataSingleTypeArg
  extends FetchCoinMetadataBaseArgs {
  type: string;
}

export interface FetchCoinMetadataMultipleTypeArg
  extends FetchCoinMetadataBaseArgs {
  types: ReadonlyArray<string>;
}

export interface FetchCoinMetadata {
  (args: FetchCoinMetadataSingleTypeArg): Promise<CoinMetadataWithType>;
  (
    args: FetchCoinMetadataMultipleTypeArg
  ): Promise<ReadonlyArray<CoinMetadataWithType>>;
}
