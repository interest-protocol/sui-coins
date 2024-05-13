import { GetRouteQuotesReturn } from '@interest-protocol/clamm-sdk';
import { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';

export const isNativeRoute = (
  route: RouterCompleteTradeRoute | GetRouteQuotesReturn
): route is GetRouteQuotesReturn => !!(route as GetRouteQuotesReturn).poolsMap;
