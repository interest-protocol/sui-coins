import { TOKEN_SYMBOL } from '@/lib';

export enum PoolOption {
  Deposit,
  Withdraw,
}

export interface CoinData {
  decimals: number;
  symbol: TOKEN_SYMBOL | string;
  type: `0x${string}`;
}

export interface PoolToken extends CoinData {
  value: string;
}

export interface PoolDepositForm {
  firstToken: PoolToken;
  secondToken: PoolToken;
}

export interface PoolWithdrawForm {
  tokenLP: PoolToken;
}
