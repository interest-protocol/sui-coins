import { GetRouteQuotesReturn } from '@interest-protocol/clamm-sdk';
import type { RouterCompleteTradeRoute } from 'aftermath-ts-sdk';
import BigNumber from 'bignumber.js';

import { FixedPointMath } from '@/lib';
import { JSONQuoteResponse } from '@/server/lib/hop/hop.utils';

import { SwapForm } from './swap.types';

export const getAmountMinusSlippage = (
  value: BigNumber,
  slippage: string
): BigNumber => {
  const slippageBn = FixedPointMath.toBigNumber(+slippage, 3);
  const newAmount = value
    .minus(value.multipliedBy(slippageBn).dividedBy(new BigNumber(100000)))
    .decimalPlaces(0, BigNumber.ROUND_DOWN);

  return newAmount.eq(value) ? newAmount.minus(new BigNumber(1)) : newAmount;
};

export const isNativeRoute = (
  route: SwapForm['route']
): route is GetRouteQuotesReturn => !!(route as GetRouteQuotesReturn).poolsMap;

export const isAftermathRoute = (
  route: RouterCompleteTradeRoute | JSONQuoteResponse
): route is RouterCompleteTradeRoute =>
  !!(route as RouterCompleteTradeRoute).spotPrice;
