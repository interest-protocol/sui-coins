import type { GetRouteQuotesReturn } from '@interest-protocol/clamm-sdk';
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
  Interest = 'interest',
  Aftermath = 'aftermath',
}

export interface SwapForm {
  to: SwapToken;
  focus: boolean;
  loading: boolean;
  swapping: boolean;
  explorerLink: string;
  error: string | null;
  readyToSwap: boolean;
  fetchingPrices: boolean;
  settings: ISwapSettings;
  lastFetchDate: number | null;
  from: SwapToken & { value: BigNumber };
  route:
    | RouterCompleteTradeRoute
    | GetRouteQuotesReturn
    | JSONQuoteResponse
    | null;
}

export interface SwapPreviewModalProps {
  onClose: () => void;
}

export interface AggregatorProps {
  url: string;
  logo: string;
  name: string;
  key: Aggregator;
  disabled?: boolean;
}

export interface SwapSelectAggregatorModalProps {
  aggregatorSelected: AggregatorProps;
  onSelect: (aggregator: Aggregator) => void;
}
