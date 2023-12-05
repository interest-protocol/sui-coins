import { FC, ReactNode } from 'react';

import { SVGProps } from '../svg/svg.types';

export interface TokenProps {
  Icon: FC<SVGProps>;
  symbol: string;
}

export interface PoolCardHeaderProps {
  Logo: FC<SVGProps>;
  name: string;
  url: string;
}

export interface PoolCardTokenInfoProps {
  tokenList: ReadonlyArray<TokenProps>;
  apr: string;
}

export interface PoolLineProps {
  description: string;
  value: string;
  tip: ReactNode;
}

export interface PoolTradeInfoProps {
  lines: PoolLineProps;
}
