import type { Token } from '@interest-protocol/sui-tokens';
import type { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import type BigNumber from 'bignumber.js';

import type { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';

export interface ISwapSettings {
  slippage: string;
  interval: string;
  aggregator: Aggregator;
}

export interface SwapToken extends Token {
  display: string;
  usdPrice: number | null;
}

export enum Aggregator {
  Hop = 'hop',
  Aftermath = 'aftermath',
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
  route: RouterCompleteTradeRoute | JSONQuoteResponse | null;
  focus: boolean;
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
  aggregatorSelected: AggregatorPros;
  onSelect: (aggregator: Aggregator) => void;
}
