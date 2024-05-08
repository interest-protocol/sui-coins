import { isEmpty, propOr } from 'ramda';

import { AmmPool } from '@/interface';

import { Dex, Routes } from './router.types';

export const constructDex = (pools: readonly AmmPool[]): Dex => {
  const dex: Dex = {};
  for (const pool of pools) {
    const coins = [pool.coinTypes.coinX, pool.coinTypes.coinY];
    coins.forEach((coinA, i) => {
      if (!dex[coinA]) dex[coinA] = [];

      for (let j = i + 1; j < coins.length; j++) {
        const coinB = coins[j];
        if (!dex[coinB]) dex[coinB] = [];

        dex[coinA].push(pool.poolId);
        if (coinB !== coinA) {
          dex[coinB].push(pool.poolId);
        }
      }
    });
  }
  return dex;
};

export const findRoutes = (
  dex: Dex | undefined | null,
  startCoin: string,
  endCoin: string
): Routes => {
  if (!dex || isEmpty(dex)) return [];

  const allPaths: [string[], string[]][] = [];
  const visited: { [key: string]: boolean } = {};

  function backtrack(currentCoin: string, path: string[], poolIds: string[]) {
    visited[currentCoin] = true;
    path.push(currentCoin);

    if (currentCoin === endCoin) {
      allPaths.push([path.slice(), poolIds.slice()]);
    } else {
      const currentCoinPools = propOr([], currentCoin, dex) as string[];

      for (const pool of currentCoinPools) {
        for (const neighborCoin of Object.keys(dex!)) {
          const neighborCoinsPools = propOr([], neighborCoin, dex) as string[];
          if (neighborCoinsPools.includes(pool) && !visited[neighborCoin]) {
            backtrack(neighborCoin, path, [...poolIds, pool]);
          }
        }
      }
    }

    visited[currentCoin] = false;
    path.pop();
  }

  backtrack(startCoin, [], []);

  return allPaths;
};
