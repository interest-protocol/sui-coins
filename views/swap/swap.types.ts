import { GetRouteQuotesReturn } from '@interest-protocol/clamm-sdk';
import { Token } from '@interest-protocol/sui-tokens';
import { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import BigNumber from 'bignumber.js';

export interface ISwapSettings {
  slippage: string;
  interval: string;
}

export interface SwapToken extends Token {
  display: string;
  usdPrice: number | null;
}

export interface SwapForm {
  to: SwapToken;
  native: boolean;
  loading: boolean;
  swapping: boolean;
  explorerLink: string;
  error: string | null;
  readyToSwap: boolean;
  fetchingPrices: boolean;
  settings: ISwapSettings;
  lastFetchDate: number | null;
  from: SwapToken & { value: BigNumber };
  route: RouterCompleteTradeRoute | GetRouteQuotesReturn | null;
}

export interface SwapPreviewModalProps {
  onClose: () => void;
}
