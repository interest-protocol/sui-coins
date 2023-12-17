import { ReactNode } from 'react';

import { CoinData } from '@/interface';

export interface PoolCardHeaderProps {
  Logo: ReactNode;
  name: string;
  url: string;
}

export interface PoolCardTokenInfoProps {
  apr: string;
  coins: ReadonlyArray<CoinData>;
}

export interface PoolCardLineProps {
  description: string;
  amount: string;
  tooltipInfo: string;
}

export interface PoolTradeInfoProps {
  lines: ReadonlyArray<PoolCardLineProps>;
}
export interface PoolCardProps {
  stable: boolean;
  token0: CoinData;
  token1: CoinData;
  lpCoin: CoinData;
  poolObjectId: string;
}
