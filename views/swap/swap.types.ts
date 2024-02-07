import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface ISwapSettings {
  slippage: string;
  deadline: string;
  speed: 'normal' | 'fast' | 'instant';
}

export interface SwapToken extends CoinObject {
  value: string;
  locked: boolean;
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
