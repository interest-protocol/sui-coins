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
  description: string;
  tooltipInfo: string;
}

export interface PoolCardProps {
  dex: DexName;
  stable: boolean;
  tokens: ReadonlyArray<CoinData>;
  lpCoin: CoinData;
  poolObjectId: string;
}
