import { ReactNode } from 'react';

import { CoinMetadataWithType } from '@/interface';

import { AMMPoolWithMetadata } from '../pools.types';

export enum FormFilterValue {
  'official' = 'official',
  'all' = 'all',
  'stable' = 'stable',
  'volatile' = 'volatile',
  'clamm' = 'clamm',
  'amm' = 'amm',
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
  pool: AMMPoolWithMetadata;
  prices: Record<string, number>;
  coinMetadata: Record<string, CoinMetadataWithType>;
}
