import BigNumber from 'bignumber.js';

import { CoinData, CoinInfo } from '@/interface';

export interface IPool {
  token0: CoinData;
  token1: CoinData;
  stable: boolean;
  decimals: number;
  balance: BigNumber;
  poolObjectId: string | null;
}

export interface TopPoolsTableItem
  extends Record<'a' | 'b' | 'c' | 'd', number> {
  pool: IPool | undefined;
}

export interface TopCoinTableItem extends Record<'a' | 'b' | 'c', number> {
  coin: CoinInfo | undefined;
}

export interface DataPoint {
  date: Date;
  day: string;
  amount: number;
  description: string;
}

export interface DataPie {
  label: string;
  amount: number;
}

export interface DataPoint {
  date: Date;
  day: string;
  amount: number;
  description: string;
}
