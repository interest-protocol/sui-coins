import { DevInspectResults } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';

import { FixedPointMath } from '@/lib';
import { Quest } from '@/server/model/quest';

import { SwapToken } from './swap.types';

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

export const calculatePriceImpact = (
  realSwap: DevInspectResults,
  zeroSwap: DevInspectResults
) => {
  if (!realSwap.events.length || !zeroSwap.events.length) return 0;

  const realSwapData = realSwap.events[0].parsedJson as Record<string, string>;
  const zeroSwapData = zeroSwap.events[0].parsedJson as Record<string, string>;

  const realExchangeRate = +realSwapData.amount_in / +realSwapData.amount_out;
  const zeroExchangeRate = +zeroSwapData.amount_in / +zeroSwapData.amount_out;

  return (
    (Math.abs(zeroExchangeRate - realExchangeRate) / zeroExchangeRate) * 100
  );
};

export const logSwap = (
  address: string,
  from: SwapToken,
  to: SwapToken,
  txDigest: string
) => {
  fetch('/api/v1/quest/swap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://dashboard.galxe.com',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      address,
      txDigest,
      kind: 'swap',
      data: {
        coinIn: {
          type: from.type,
          amount: from.value,
          symbol: from.symbol,
        },
        coinOut: {
          type: to.type,
          amount: to.value,
          symbol: to.symbol,
        },
      },
    } as Omit<Quest, 'timestamp'>),
  });
};
