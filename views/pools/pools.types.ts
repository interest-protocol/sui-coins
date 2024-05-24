import { AmmPool } from '@/interface';
import { AMMPool } from '@/server/model/amm-pool';

import { ISwapSettings } from '../swap/swap.types';
import { FormFilterValue } from './pool-card/pool-card.types';

export interface AMMPoolWithMetadata extends AMMPool {
  metadata?: AmmPool;
}

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

export interface PoolCardListContentProps {
  done: boolean;
  hasMore?: boolean;
  totalItems?: number;
  nextPage?: () => void;
  arePoolsLoading: boolean;
  pools?: ReadonlyArray<AMMPoolWithMetadata>;
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
  tokenSelected?: string;
  explorerLink: string;
  isFindingPool: boolean;
  settings: ISwapSettings;
  tokenList: ReadonlyArray<PoolToken>;
  filterList: ReadonlyArray<FilterItemProps>;
  pool: AmmPool;
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}
