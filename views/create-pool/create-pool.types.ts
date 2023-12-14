import { CoinData } from '@/interface';

export interface TokenInfo extends CoinData {
  value: `${number}`;
}

export interface IPoolForm {
  dex: string;
  name: string;
  tradeFee: string;
  tokenA: TokenInfo;
  tokenB: TokenInfo;
}
