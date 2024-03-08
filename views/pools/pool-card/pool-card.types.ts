import { ReactNode } from 'react';

import { DexName } from '@/constants/pools';
import { CoinData } from '@/interface';

export interface PoolCardHeaderTagProps {
  name: string;
}

export interface PoolCardHeaderProps {
  name: string;
  dexUrl: string;
  tags?: ReadonlyArray<PoolCardHeaderTagProps>;
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
  stable: boolean;
  lpCoin: CoinData;
  poolObjectId: string;
  tokens: ReadonlyArray<CoinData>;
}
