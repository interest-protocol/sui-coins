import { isEmpty } from 'ramda';

import { AmmPool, ClammPool, CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

export const getAmmLiquidity = (
  pool: AmmPool,
  metadata: Record<string, CoinMetadataWithType>,
  prices: Record<string, number>
): number => {
  if (isEmpty(prices)) return 0;

  const priceX = metadata[pool.coinTypes.coinX]
    ? prices[
        metadata[pool.coinTypes.coinX]?.symbol.toLowerCase() === 'sui'
          ? 'mov'
          : metadata[pool.coinTypes.coinX]?.symbol.toLowerCase()
      ]
    : null;

  const priceY = metadata[pool.coinTypes.coinY]
    ? prices[
        metadata[pool.coinTypes.coinY]?.symbol.toLowerCase() === ' sui'
          ? 'move'
          : metadata[pool.coinTypes.coinY]?.symbol.toLowerCase()
      ]
    : null;

  if (!priceX && !!priceY)
    return 2 * FixedPointMath.toNumber(pool.balanceY, pool.decimalsY) * priceY;

  if (!priceY && !!priceX)
    return 2 * FixedPointMath.toNumber(pool.balanceX, pool.decimalsX) * priceX;

  if (priceX && priceY)
    return (
      FixedPointMath.toNumber(pool.balanceY, pool.decimalsY) * priceY +
      FixedPointMath.toNumber(pool.balanceX, pool.decimalsX) * priceX
    );

  return 0;
};

export const getClammLiquidity = (pool: ClammPool): number =>
  FixedPointMath.toNumber(
    pool.coinStates.reduce(
      (acc, { index, price }) =>
        acc.plus(
          price.multipliedBy(pool.balances[FixedPointMath.toNumber(index, 18)])
        ),
      ZERO_BIG_NUMBER
    ),
    18
  );
