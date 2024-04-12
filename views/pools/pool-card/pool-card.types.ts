import { AmmPool, CoinData } from '@/interface';
import { PoolTypeEnum } from '@/interface';

export enum AlgorithmEnum {
  'stable' = 'stable',
  'volatile' = 'volatile',
}

export interface PoolCardHeaderProps {
  tags?: ReadonlyArray<string>;
}

export interface PoolCardTokenInfoProps {
  coins: ReadonlyArray<CoinData>;
}

export interface PoolCardTradeProps {
  index: number;
  amount: string;
  isInfo?: boolean;
  description: string;
  tooltipInfo: string;
}

export interface PoolCardProps {
  pool?: AmmPool;
  stable: boolean;
  lpCoin: CoinData;
  poolObjectId: string;
  poolType: PoolTypeEnum;
  prices?: ReadonlyArray<number>;
  tokens: ReadonlyArray<CoinData>;
}
