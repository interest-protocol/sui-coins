import { PoolMetadata } from '@interest-protocol/clamm-sdk';
import { ReactNode } from 'react';

import { CoinMetadataWithType } from '@/interface';

export enum AlgorithmEnum {
  'stable' = 'stable',
  'volatile' = 'volatile',
}

export enum CategoryEnum {
  'official' = 'official',
  'partner' = 'partners',
  'all' = 'all',
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
  pool: PoolMetadata;
  prices: Record<string, number>;
  coinMetadata: Record<string, CoinMetadataWithType>;
}
