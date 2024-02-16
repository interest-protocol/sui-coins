import { CoinMetadata } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';

import { TOKEN_SYMBOL } from '@/lib';

export type Chain = 'ETH' | 'BSC' | 'SOL' | 'AVA';
export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  type: string;
  decimals: number;
  symbol: TOKEN_SYMBOL | string;
}

export interface CoinDataWithChainInfo extends CoinData {
  chain?: Chain;
}

export type LocalTokenMetadataRecord = Record<string, CoinData>;

export type DexMarket = Record<string, Record<string, string>>;

export interface FormattedNumber {
  unit: string;
  value: number;
  toString: (unitSeparator?: string) => string;
}

export interface RegistryPool {
  poolId: string;
  lpCoinType: string;
}

export interface CoinMetadataWithType extends CoinMetadata {
  type: string;
}

export interface NFTCollection {
  name: string;
  collectionId: string;
  holders: ReadonlyArray<string>;
}

export interface NFTCollectionMetadata {
  id: string;
  img: string;
  name: string;
  total: number;
  updatedAt?: number;
}
