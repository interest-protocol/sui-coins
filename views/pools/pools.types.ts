import { InterestPool, PoolMetadata } from '@interest-protocol/clamm-sdk';

import { Network } from '@/constants';
import { CoinData } from '@/interface';

import { ISwapSettings } from '../swap/swap.types';

export enum FilterTypeEnum {
  ALGORITHM = 'algorithm',
  POOL_TYPE = 'pool_type',
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

export interface PoolCardListWrapper {
  network: Network;
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
  description: string;
}
