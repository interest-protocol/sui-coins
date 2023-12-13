import { ReactNode } from 'react';

export interface TokenInfo {
  tokenIcon: ReactNode;
  tokenName: string;
  value: number;
}

export interface PoolProps {
  name: string;
  coinOwner: string;
  tradeFee: number;
  token: TokenInfo;
}
