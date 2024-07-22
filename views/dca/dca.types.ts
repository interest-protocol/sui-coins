import type { GetRouteQuotesReturn } from '@interest-protocol/clamm-sdk';
import type { Token } from '@interest-protocol/sui-tokens';
import type { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import type BigNumber from 'bignumber.js';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import type { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';

export enum Period {
  Minutes,
  Day,
  Week,
  Month,
}

export interface IDCASettings {
  slippage: string;
  interval: string;
  aggregator: Aggregator;
}

export interface DCAToken extends Token {
  display: string;
  value: BigNumber;
  usdPrice: number | null;
}

export enum Aggregator {
  Hop = 'hop',
  Interest = 'interest',
  Aftermath = 'aftermath',
}

export interface DCAForm {
  to: Token;
  from: DCAToken;
  focus: boolean;
  loading: boolean;
  swapping: boolean;
  explorerLink: string;
  error: string | null;
  readyToStartDCA: boolean;
  fetchingPrices: boolean;
  settings: IDCASettings;
  lastFetchDate: number | null;
  route:
    | RouterCompleteTradeRoute
    | GetRouteQuotesReturn
    | JSONQuoteResponse
    | null;
}

export interface DCAPreviewModalProps {
  onClose: () => void;
}

export interface AggregatorProps {
  url: string;
  name: string;
  key: Aggregator;
  Icon: FC<SVGProps>;
  disabled?: boolean;
}

export interface DCASelectAggregatorModalProps {
  aggregatorSelected: AggregatorProps;
  onSelect: (aggregator: Aggregator) => void;
}
