import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface TokenInfo extends CoinObject {
  value: `${number}`;
}

export interface IPoolForm {
  dex: string;
  name: string;
  tradeFee: string;
  tokenA: TokenInfo;
  tokenB: TokenInfo;
}
