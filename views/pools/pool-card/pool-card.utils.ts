import {
  InterestPool,
  StablePool,
  VolatilePool,
} from '@interest-protocol/clamm-sdk';
import { BigNumber } from 'bignumber.js';
import { isEmpty } from 'ramda';

import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';

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

  const priceX = metadata[pool.coinTypes[0]]
    ? prices[
        metadata[pool.coinTypes[0]]?.symbol.toLowerCase() === 'sui'
          ? 'mov'
          : metadata[pool.coinTypes[0]]?.symbol.toLowerCase()
      ]
    : null;

  const priceY = metadata[pool.coinTypes[1]]
    ? prices[
        metadata[pool.coinTypes[1]]?.symbol.toLowerCase() === ' sui'
          ? 'move'
          : metadata[pool.coinTypes[1]]?.symbol.toLowerCase()
      ]
    : null;

  if (!priceX && !!priceY)
    return (
      2 *
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[1])),
        metadata[pool.coinTypes[1]].decimals
      ) *
      priceY
    );

  if (!priceY && !!priceX)
    return (
      2 *
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[0])),
        metadata[pool.coinTypes[0]].decimals
      ) *
      priceX
    );

  if (priceX && priceY)
    return (
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[1])),
        metadata[pool.coinTypes[1]].decimals
      ) *
        priceY +
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[0])),
        metadata[pool.coinTypes[0]].decimals
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

  const priceX = metadata[pool.coinTypes[0]]
    ? prices[
        metadata[pool.coinTypes[0]]?.symbol.toLowerCase() === 'sui'
          ? 'mov'
          : metadata[pool.coinTypes[0]]?.symbol.toLowerCase()
      ]
    : null;

  const priceY = metadata[pool.coinTypes[1]]
    ? prices[
        metadata[pool.coinTypes[1]]?.symbol.toLowerCase() === ' sui'
          ? 'move'
          : metadata[pool.coinTypes[1]]?.symbol.toLowerCase()
      ]
    : null;

  if (!priceX && !!priceY)
    return (
      2 *
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[1])),
        metadata[pool.coinTypes[1]].decimals
      ) *
      priceY
    );

  if (!priceY && !!priceX)
    return (
      2 *
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[0])),
        metadata[pool.coinTypes[0]].decimals
      ) *
      priceX
    );

  if (priceX && priceY)
    return (
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[1])),
        metadata[pool.coinTypes[1]].decimals
      ) *
        priceY +
      FixedPointMath.toNumber(
        BigNumber(String(pool.state.balances[0])),
        metadata[pool.coinTypes[0]].decimals
      ) *
        priceX
    );

  return 0;
};
