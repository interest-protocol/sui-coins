import { Token } from '@interest-protocol/sui-tokens';
import { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';

export interface ISwapSettings {
  slippage: string;
  interval: string;
}

export interface SwapToken extends Token {
  value: string;
  usdPrice: number | null;
}

export interface SwapForm {
  to: SwapToken;
  from: SwapToken;
  loading: boolean;
  explorerLink: string;
  error: string | null;
  readyToSwap: boolean;
  fetchingPrices: boolean;
  settings: ISwapSettings;
  lastFetchDate: number | null;
  route: RouterCompleteTradeRoute | null;
}

export interface SwapPreviewModalProps {
  onClose: () => void;
}
