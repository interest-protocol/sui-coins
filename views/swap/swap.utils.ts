import { GetRouteQuotesReturn } from '@interest-protocol/clamm-sdk';

import { SwapForm } from './swap.types';

export const isNativeRoute = (
  route: SwapForm['route']
): route is GetRouteQuotesReturn => !!(route as GetRouteQuotesReturn).poolsMap;
