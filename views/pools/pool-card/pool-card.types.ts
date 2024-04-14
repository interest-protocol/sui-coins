import { AmmPool, CoinMetadataWithType } from '@/interface';

export enum AlgorithmEnum {
  'stable' = 'stable',
  'volatile' = 'volatile',
}

export interface PoolCardHeaderProps {
  tags?: ReadonlyArray<string>;
}

export interface PoolCardTokenInfoProps {
  coinTypes: ReadonlyArray<string>;
  coinMetadata: Record<string, CoinMetadataWithType>;
}

export interface PoolCardTradeProps {
  index: number;
  amount: string;
  isInfo?: boolean;
  description: string;
  tooltipInfo: string;
}

export interface PoolCardProps {
  pool: AmmPool;
  prices: Record<string, number>;
  coinMetadata: Record<string, CoinMetadataWithType>;
}
