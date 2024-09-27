import type { Trade } from '@hop.ag/sdk';
import type { Token } from '@interest-protocol/sui-tokens';
import type { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import type BigNumber from 'bignumber.js';
import type { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface JSONQuoteResponse {
  trade: Trade;
  amount_out_with_fee: string;
}

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
  focus: boolean;
  fixedIn: boolean;
  fixedOut: boolean;
  loading: boolean;
  swapping: boolean;
  updateSlider: object;
  explorerLink: string;
  error: string | null;
  readyToSwap: boolean;
  executionTime: number;
  fetchingPrices: boolean;
  settings: ISwapSettings;
  lastFetchDate: number | null;
  from: SwapToken & { value: BigNumber };
  route: RouterCompleteTradeRoute | JSONQuoteResponse | null;
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

export interface SwapInitManagerProps {
  from: string;
  to: string;
}
