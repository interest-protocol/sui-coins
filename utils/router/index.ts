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
  Dex: Dex,
  startCoin: string,
  endCoin: string
): Routes => {
  const allPaths: [string[], string[]][] = [];
  const visited: { [key: string]: boolean } = {};

  function backtrack(currentCoin: string, path: string[], poolIds: string[]) {
    visited[currentCoin] = true;
    path.push(currentCoin);

    if (currentCoin === endCoin) {
      allPaths.push([path.slice(), poolIds.slice()]);
    } else {
      for (const pool of Dex[currentCoin]) {
        for (const neighborCoin of Object.keys(Dex)) {
          if (Dex[neighborCoin].includes(pool) && !visited[neighborCoin]) {
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
