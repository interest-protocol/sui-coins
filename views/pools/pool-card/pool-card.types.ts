import { ReactNode } from 'react';

import { Pool, CoinMetadataWithType } from '@/interface';

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
  pool: Pool;
  prices: Record<string, number>;
  coinMetadata: Record<string, CoinMetadataWithType>;
}
