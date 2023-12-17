import { FC, ReactNode } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface TokenProps {
  Icon: FC<SVGProps>;
  symbol: string;
}

export interface PoolCardHeaderProps {
  Logo: ReactNode;
  name: string;
  url: string;
}

export interface PoolCardTokenInfoProps {
  tokenList: ReadonlyArray<TokenProps>;
  apr: string;
}

export interface PoolCardLineProps {
  amount: string;
  lastLine?: boolean;
  description: string;
  tooltipInfo: string;
}

export interface PoolTradeInfoProps {
  lines: ReadonlyArray<PoolCardLineProps>;
}

export interface PoolCardProps {
  dexInfo: PoolCardHeaderProps;
  pairInfo: PoolCardTokenInfoProps;
  tradeInfo: PoolTradeInfoProps;
}
