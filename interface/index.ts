import BigNumber from 'bignumber.js';

export type BigNumberish = BigNumber | bigint | string | number;
export type Chain = 'ETH' | 'BSC' | 'SOL' | 'AVA' | 'SUI';

export interface CoinData {
  type: string;
  decimals: number;
  symbol: string;
}

export type LocalTokenMetadataRecord = Record<string, CoinData>;

export type DexMarket = Record<string, Record<string, string>>;

export interface FormattedNumber {
  unit: string;
  value: number;
  toString: (unitSeparator?: string) => string;
}

export interface PoolPageProps {
  objectId: string;
}

export interface RegistryPool {
  poolId: string;
  lpCoinType: string;
}
