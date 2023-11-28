import { TOKEN_SYMBOL } from '@/lib';

export interface CoinData {
  decimals: number;
  symbol: TOKEN_SYMBOL | string;
  type: string;
}

export interface ISwapSettings {
  slippage: string;
  deadline: string;
  speed: 'normal' | 'fast' | 'instant';
}

export interface SwapToken extends CoinData {
  value: string;
  balance: number | null;
}

export interface SwapForm {
  to: SwapToken;
  from: SwapToken;
  settings: ISwapSettings;
}
