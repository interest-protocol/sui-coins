export enum PoolTabEnum {
  Pools,
  MyPosition,
}

import { TOKEN_SYMBOL } from '@/lib';

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
}

/*export interface PoolWithdrawForm {
  lpCoin: string | PoolToken;
  tokenList: Array<PoolToken>;
}
*/
