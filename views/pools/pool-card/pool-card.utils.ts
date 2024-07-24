import {
  InterestPool,
  StablePool,
  VolatilePool,
} from '@interest-protocol/clamm-sdk';
import { BigNumber } from 'bignumber.js';
import { isEmpty } from 'ramda';

import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath, Rounding } from '@/lib';

export const isStablePool = (
  pool: InterestPool,
  isStable: boolean
): pool is StablePool => isStable;

export const getStableLiquidity = (
  pool: StablePool,
  metadata: Record<string, CoinMetadataWithType>,
  prices: Record<string, number>
): number => {
  if (isEmpty(prices)) return 0;

  const priceX = prices[pool.coinTypes[0]];

  const priceY = prices[pool.coinTypes[1]];

  if (!priceX && !!priceY)
    return (
      2 *
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[1])),
        metadata[pool.coinTypes[1]].decimals,
        Rounding.ROUND_DOWN
      ) *
      priceY
    );

  if (!priceY && !!priceX)
    return (
      2 *
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[0])),
        metadata[pool.coinTypes[0]].decimals,
        Rounding.ROUND_DOWN
      ) *
      priceX
    );

  if (priceX && priceY)
    return (
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[1])),
        metadata[pool.coinTypes[1]].decimals,
        Rounding.ROUND_DOWN
      ) *
        priceY +
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[0])),
        metadata[pool.coinTypes[0]].decimals,
        Rounding.ROUND_DOWN
      ) *
        priceX
    );

  return 0;
};

export const getVolatileLiquidity = (
  pool: VolatilePool,
  metadata: Record<string, CoinMetadataWithType>,
  prices: Record<string, number>
): number => {
  if (isEmpty(prices)) return 0;

  const priceX = prices[pool.coinTypes[0]];

  const priceY = prices[pool.coinTypes[1]];

  if (!priceX && !!priceY)
    return (
      2 *
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[1])),
        18,
        Rounding.ROUND_DOWN
      ) *
      priceY
    );

  if (!priceY && !!priceX)
    return (
      2 *
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[0])),
        18,
        Rounding.ROUND_DOWN
      ) *
      priceX
    );

  if (priceX && priceY)
    return (
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[1])),
        18,
        Rounding.ROUND_DOWN
      ) *
        priceY +
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[0])),
        18,
        Rounding.ROUND_DOWN
      ) *
        priceX
    );

  return 0;
};
