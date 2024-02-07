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

export type Chain = 'ETH' | 'BSC' | 'SOL' | 'AVA';

export interface CoinDataWithChainInfo extends CoinData {
  chain?: Chain;
}

export interface PoolToken extends CoinData {
  value: string;
  balance: number | null;
}

export interface PoolDepositForm {
  firstToken: PoolToken;
  secondToken: PoolToken;
}

export interface PoolWithdrawForm {
  tokenLP: PoolToken;
}
