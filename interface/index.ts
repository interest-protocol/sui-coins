import BigNumber from 'bignumber.js';

import { TOKEN_SYMBOL } from '@/constants';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  type: string;
  decimals: number;
  symbol: TOKEN_SYMBOL | string;
}

export type LocalTokenMetadataRecord = Record<string, CoinData>;

export type DexMarket = Record<string, Record<string, string>>;

export interface FormattedNumber {
  unit: string;
  value: number;
  toString: (unitSeparator?: string) => string;
}
