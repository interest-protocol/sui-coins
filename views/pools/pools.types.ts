import { InterestPool, PoolMetadata } from '@interest-protocol/clamm-sdk';

import { CoinData } from '@/interface';
import { FormFilterValue } from '@/views/pools/pool-card/pool-card.types';

import { ISwapSettings } from '../swap/swap.types';

export enum FilterTypeEnum {
  ALGORITHM = 'algorithm',
  CATEGORY = 'category',
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
  pools: readonly InterestPool[];
}
export interface PoolToken extends CoinData {
  value: string;
  locked: boolean;
}

export interface PoolForm {
  error: string | null;
  lpCoin: PoolToken;
  tokenSelected?: string;
  explorerLink: string;
  isFindingPool: boolean;
  settings: ISwapSettings;
  tokenList: ReadonlyArray<PoolToken>;
  filterList: ReadonlyArray<FilterItemProps>;
  pool: PoolMetadata;
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}
