import { Token } from '@interest-protocol/sui-tokens';
import { RouterCompleteTradeRoute, RouterTradePath } from 'aftermath-ts-sdk';

export interface ISwapSettings {
  slippage: string;
  interval: string;
}

export interface SwapToken extends Token {
  value: string;
  locked: boolean;
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
  lock: boolean;
  from: SwapToken;
  loading: boolean;
  maxValue: boolean;
  disabled: boolean;
  error: string | null;
  readyToSwap: boolean;
  settings: ISwapSettings;
  route: RouterCompleteTradeRoute | null;
  swapPath: ReadonlyArray<RouterTradePath>;
}

export interface SwapForm {
  to: SwapToken;
  lock: boolean;
  from: SwapToken;
  disabled: boolean;
  maxValue: boolean;
}

export interface SwapPreviewModalProps {
  onClose: () => void;
}
