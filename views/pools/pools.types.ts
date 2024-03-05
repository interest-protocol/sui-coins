import { TOKEN_SYMBOL } from '@/lib';

import { ISwapSettings } from '../swap/swap.types';

export enum PoolTabEnum {
  Pools,
  MyPosition,
}

export enum PoolOption {
  Deposit,
  Withdraw,
}

export interface CoinData {
  decimals: number;
  symbol: TOKEN_SYMBOL | string;
  type: string;
}

export interface PoolToken extends CoinData {
  value: string;
  balance: number | null;
}

export interface PoolForm {
  tokenList: Array<PoolToken>;
  lpCoin: string | PoolToken;
  settings: ISwapSettings;
}
