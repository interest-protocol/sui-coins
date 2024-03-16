import { Token } from '@interest-protocol/sui-tokens';
import { RouterCompleteTradeRoute, RouterTradePath } from 'aftermath-ts-sdk';

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
  error: string | null;
  settings: ISwapSettings;
  route: RouterCompleteTradeRoute | null;
  swapPath: ReadonlyArray<RouterTradePath>;
  swapStatus: 'loading' | 'success' | 'error' | null;
}

export interface SwapPreviewModalProps {
  onClose: () => void;
}
