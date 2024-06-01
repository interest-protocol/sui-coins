import { CoinMetadata } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';

import { TOKEN_SYMBOL } from '@/lib';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  decimals: number;
  type: `0x${string}`;
  symbol: TOKEN_SYMBOL | string;
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
  type: `0x${string}`;
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

export interface ZkSendLinkData {
  id: string;
  digest: string;
  links: ReadonlyArray<string>;
}

export interface LocalCoinMetadata {
  decimals: number;
  symbol: string;
  type: string;
}

export interface PoolPageProps {
  objectId: string;
  stateId: string;
}

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}
