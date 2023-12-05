import { FC, ReactNode } from 'react';

import { SVGProps } from '../svg/svg.types';

export interface TMPCoinProps {
  decimals: number;
  symbol: string;
  type: string;
}

export interface PoolOwnerProps {
  Logo: FC<SVGProps>;
  name: string;
  url: string;
}

export interface PoolTokenInfoProps {
  token: ReadonlyArray<TMPCoinProps>;
  percentage: string;
}

export interface PoolLineProps {
  description: string;
  value: string;
  tip: ReactNode;
}

export interface PoolTradeInfoProps {
  lines: PoolLineProps;
}

export interface PoolCardProps {
  owner: PoolOwnerProps;
  coins: string;
  price: number;
  trade: ReadonlyArray<PoolLineProps>;
}
