import { ReactNode } from 'react';

import { DexName } from '@/constants/pools';
import { CoinData } from '@/interface';

export enum PoolTypeEnum {
  'clamm' = 'clamm',
  'amm' = 'amm',
}

export enum AlgorithmEnum {
  'stable' = 'stable',
  'volatile' = 'volatile',
}

export interface PoolCardHeaderProps {
  name: string;
  dexUrl: string;
  tags?: ReadonlyArray<string>;
  Logo: ReactNode;
  objectId: string;
}

export interface PoolCardTokenInfoProps {
  apr: string;
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
  dex: DexName;
  poolType: PoolTypeEnum;
  algorithm: AlgorithmEnum;
  lpCoin: CoinData;
  poolObjectId: string;
  tokens: ReadonlyArray<CoinData>;
}
