import BigNumber from 'bignumber.js';

import { Quest } from '@/server/model/quest';
import { PoolToken } from '@/views/pools/pools.types';

export const getAmmOptimalCoin0Value = (
  coinYAmount: BigNumber,
  coinXReserves: BigNumber,
  coinYReserves: BigNumber
) => coinYAmount.multipliedBy(coinXReserves).dividedBy(coinYReserves);

export const getAmmOptimalCoin1Value = (
  coinXAmount: BigNumber,
  coinXReserves: BigNumber,
  coinYReserves: BigNumber
) => coinXAmount.multipliedBy(coinYReserves).dividedBy(coinXReserves);

const quoteAmmLiquidity = (
  amountA: BigNumber,
  reservesA: BigNumber,
  reservesB: BigNumber
) => amountA.multipliedBy(reservesB).dividedBy(reservesA);

const getAmmOptimalAddLiquidity = (
  desiredAmountX: BigNumber,
  desiredAmountY: BigNumber,
  reservesX: BigNumber,
  reservesY: BigNumber
) => {
  if (reservesX.isZero() && reservesY.isZero())
    return [desiredAmountX, desiredAmountY];

  const optimalYAmount = quoteAmmLiquidity(
    desiredAmountX,
    reservesX,
    reservesY
  );

  if (desiredAmountY.gte(optimalYAmount))
    return [desiredAmountX, optimalYAmount];

  const optimalXAmount = quoteAmmLiquidity(
    desiredAmountY,
    reservesY,
    reservesX
  );

  return [optimalXAmount, desiredAmountY];
};

export const getAmmLpCoinAmount = (
  coinXAmount: BigNumber,
  coinYAmount: BigNumber,
  coinXReserves: BigNumber,
  coinYReserves: BigNumber,
  supply: BigNumber
) => {
  const [optimalAmount0, optimalAmount1] = getAmmOptimalAddLiquidity(
    coinXAmount,
    coinYAmount,
    coinXReserves,
    coinYReserves
  );

  const amount0 = optimalAmount0.multipliedBy(supply).dividedBy(coinXReserves);
  const amount1 = optimalAmount1.multipliedBy(supply).dividedBy(coinYReserves);

  return amount0.gt(amount1) ? amount1 : amount0;
};

export const getAmmXYAmount = (
  lpAmount: BigNumber,
  coinXReserves: BigNumber,
  coinYReserves: BigNumber,
  supply: BigNumber
) => {
  const optimalAmountX = lpAmount.multipliedBy(coinXReserves).dividedBy(supply);
  const optimalAmountY = lpAmount.multipliedBy(coinYReserves).dividedBy(supply);

  return [optimalAmountX, optimalAmountY];
};

export const logDepositPool = (
  address: string,
  tokenA: PoolToken,
  tokenB: PoolToken,
  txDigest: string
) => {
  fetch('/api/v1/log-quest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      address,
      txDigest,
      kind: 'addLiquidity',
      data: {
        coinA: {
          type: tokenA.type,
          amount: tokenA.value,
          symbol: tokenA.symbol,
        },
        coinB: {
          type: tokenB.type,
          amount: tokenB.value,
          symbol: tokenB.symbol,
        },
      },
    } as Omit<Quest, 'timestamp'>),
  });
};
