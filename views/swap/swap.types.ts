import type { GetRouteQuotesReturn } from '@interest-protocol/clamm-sdk';
import type { Token } from '@interest-protocol/sui-tokens';
import type { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import type BigNumber from 'bignumber.js';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import type { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';

export interface ISwapSettings {
  slippage: string;
  interval: string;
  aggregator: Aggregator;
}

export interface SwapToken extends Token {
  display: string;
  value: BigNumber;
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
  from: SwapToken;
  loading: boolean;
  swapping: boolean;
  explorerLink: string;
  error: string | null;
  readyToSwap: boolean;
  executionTime: number;
  origin: 'to' | 'from';
  fetchingPrices: boolean;
  settings: ISwapSettings;
  lastFetchDate: number | null;
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
  name: string;
  key: Aggregator;
  Icon: FC<SVGProps>;
  disabled?: boolean;
}

export interface SwapSelectAggregatorModalProps {
  aggregatorSelected: AggregatorProps;
  onSelect: (aggregator: Aggregator) => void;
}
