import { FC } from 'react';

import { SVGProps } from '../../../components/svg/svg.types';

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

export interface PoolCardLineProps {
  description: string;
  amount: string;
  tooltipInfo: string;
}

export interface PoolTradeInfoProps {
  lines: ReadonlyArray<PoolCardLineProps>;
}
