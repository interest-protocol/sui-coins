export type TFilter = 'all' | 'month' | 'halfMonth' | 'daily' | 'total';
import BigNumber from 'bignumber.js';
import { CoinInfo } from 'interface/sentio';

import { CoinData } from '@/interface';

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
