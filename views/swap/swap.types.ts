import { CoinData } from '@/interface';

export interface ISwapSettings {
  slippage: string;
}

export interface SwapToken extends CoinData {
  value: string;
  usdPrice: number | null;
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
  error?: string | null;
  loading: boolean;
  maxValue: boolean;
  disabled: boolean;
  swapPath: SwapPath;
  readyToSwap: boolean;
}

export interface SwapPreviewModalProps {
  onClose: () => void;
}
