import type { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';

import { JSONQuoteResponse } from './swap.types';

export const isAftermathRoute = (
  route: RouterCompleteTradeRoute | JSONQuoteResponse
): route is RouterCompleteTradeRoute =>
  !!(route as RouterCompleteTradeRoute).spotPrice;
