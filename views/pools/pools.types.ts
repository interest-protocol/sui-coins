import { Network } from '@/constants';
import { AmmPool } from '@/interface';
import { TOKEN_SYMBOL } from '@/lib';

import { ISwapSettings } from '../swap/swap.types';

export enum FilterTypeEnum {
  ALGORITHM = 'algorithm',
  POOL_TYPE = 'pool_type',
}

export enum PoolTabEnum {
  Pools,
  MyPosition,
}

export enum PoolOption {
  Deposit,
  Withdraw,
}

export interface PoolCardListProps {
  tab: PoolTabEnum;
}

export interface PoolCardListWrapper {
  network: Network;
}

export interface PoolCardListContentProps {
  network: Network;
  arePoolsLoading: boolean;
  pools: readonly AmmPool[];
}

export interface CoinData {
  decimals: number;
  symbol: TOKEN_SYMBOL | string;
  type: string;
}

export interface PoolToken extends CoinData {
  value: string;
  balance: number | null;
}

export interface PoolForm {
  lpCoin: PoolToken;
  isFindingPool: boolean;
  settings: ISwapSettings;
  tokenList: ReadonlyArray<CoinData>;
  filterList: ReadonlyArray<FilterItemProps>;
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  description: string;
}
