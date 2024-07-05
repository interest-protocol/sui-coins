import { GetRouteQuotesReturn } from '@interest-protocol/clamm-sdk';
import type { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';

import { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';

import { SwapForm } from './swap.types';

export const isNativeRoute = (
  route: SwapForm['route']
): route is GetRouteQuotesReturn => !!(route as GetRouteQuotesReturn).poolsMap;

export const isAftermathRoute = (
  route: RouterCompleteTradeRoute | JSONQuoteResponse
): route is RouterCompleteTradeRoute =>
  !!(route as RouterCompleteTradeRoute).spotPrice;
