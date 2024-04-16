import { ReactNode } from 'react';

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
  isInfo?: boolean;
  amount: ReactNode;
  description: string;
  tooltipInfo: string;
}

export interface PoolCardProps {
  pool: AmmPool;
  prices: Record<string, number>;
  coinMetadata: Record<string, CoinMetadataWithType>;
}
