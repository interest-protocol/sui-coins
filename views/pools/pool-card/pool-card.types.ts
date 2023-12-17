import { ReactNode } from 'react';

import { TDexSources } from '@/constants/dex';
import { CoinData } from '@/interface';

export interface PoolCardHeaderProps {
  name: string;
  dexUrl: string;
  Logo: ReactNode;
  objectId: string;
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
  dex: TDexSources;
  token0: CoinData;
  token1: CoinData;
  lpCoin: CoinData;
  poolObjectId: string;
}
