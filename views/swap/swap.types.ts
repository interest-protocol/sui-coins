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
  loading: boolean;
  swapping: boolean;
  explorerLink: string;
  error: string | null;
  readyToSwap: boolean;
  fetchingPrices: boolean;
  settings: ISwapSettings;
  lastFetchDate: number | null;
  from: SwapToken & { value: BigNumber };
  route: RouterCompleteTradeRoute | null;
  aggregator: AggregatorPros;
}

export interface SwapPreviewModalProps {
  onClose: () => void;
}

export interface AggregatorPros {
  url: string;
  logo: string;
  name: string;
  shortName: 'hop' | 'aftermath';
}

export interface SwapSelectAggregatorModalProps {
  onSelect: (aggregator: AggregatorPros) => void;
  aggregatorSelected: AggregatorPros;
}
