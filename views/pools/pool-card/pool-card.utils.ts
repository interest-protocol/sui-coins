import { AmmPool } from '@/interface';
import { FixedPointMath } from '@/lib';

export const getLiquidity = (
  pool: AmmPool,
  [priceX, priceY]: ReadonlyArray<number>
): number => {
  if (!priceX && !priceY) return 0;

  if (!priceX)
    return 2 * FixedPointMath.toNumber(pool.balanceY, pool.decimalsY) * priceY;

  if (!priceY)
    return 2 * FixedPointMath.toNumber(pool.balanceX, pool.decimalsX) * priceX;

  return (
    FixedPointMath.toNumber(pool.balanceY, pool.decimalsY) * priceY +
    FixedPointMath.toNumber(pool.balanceX, pool.decimalsX) * priceX
  );
};
