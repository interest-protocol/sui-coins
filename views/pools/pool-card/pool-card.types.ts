import { ReactNode } from 'react';

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

export interface PoolCardTradeProps {
  index: number;
  amount: string;
  description: string;
  tooltipInfo: string;
}

export interface PoolCardProps {
  dex: string;
  stable: boolean;
  tokens: ReadonlyArray<CoinData>;
  lpCoin: CoinData;
  poolObjectId: string;
}
