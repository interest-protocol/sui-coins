import { CoinData } from '@/interface';

export interface ISwapSettings {
  slippage: string;
  deadline: string;
  speed: 'normal' | 'fast' | 'instant';
}

export interface SwapToken extends CoinData {
  value: string;
  locked: boolean;
  balance: number | null;
}

interface SwapTypeArgs {
  coinIn: string;
  coinOut: string;
  lpCoin: string;
}

export type SwapPath = ReadonlyArray<SwapTypeArgs>;

export interface SwapForm {
  to: SwapToken;
  from: SwapToken;
  settings: ISwapSettings;
  lock: boolean;
  maxValue: boolean;
  disabled: boolean;
  swapPath: SwapPath;
  readyToSwap: boolean;
}

export interface SwapForm {
  to: SwapToken;
  from: SwapToken;
  lock: boolean;
  disabled: boolean;
  maxValue: boolean;
}
