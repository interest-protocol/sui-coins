import { AmmPool } from '@/interface';

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

export interface PoolCardListContentProps {
  hasMore?: boolean;
  totalItems?: number;
  nextPage?: () => void;
  arePoolsLoading: boolean;
  pools: readonly AmmPool[];
}

export interface CoinData {
  type: string;
  symbol: string;
  decimals: number;
}

export interface PoolToken extends CoinData {
  value: string;
  locked: boolean;
}

export interface PoolForm {
  error: string | null;
  lpCoin: PoolToken;
  explorerLink: string;
  isFindingPool: boolean;
  settings: ISwapSettings;
  tokenList: ReadonlyArray<PoolToken>;
  filterList: ReadonlyArray<FilterItemProps>;
  pool: AmmPool;
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  description: string;
}
