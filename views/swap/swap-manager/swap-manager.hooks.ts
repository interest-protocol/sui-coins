import { md5 } from 'js-md5';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { AmmServerPool } from '@/interface';
import {
  constructDex,
  convertServerPoolToClientPool,
  makeSWRKey,
} from '@/utils';

import { PoolsMap, UseGetDexArgs, UseGetDexReturn } from './swap-manager.types';

const cache = new Map<string, UseGetDexReturn>();

export const useGetDex = ({ coinInType, coinOutType }: UseGetDexArgs) => {
  const network = useNetwork();
  const key = md5([coinInType, coinOutType].sort().toString());

  return useSWR<UseGetDexReturn>(
    makeSWRKey([network, key], `/api/v1/get-pools-by-cointypes`),
    async () => {
      if (!coinInType || !coinOutType)
        return {
          poolsMap: {},
          dex: {},
        };

      if (cache.has(key)) return cache.get(key)!;

      const fetchRes = await fetch(
        `/api/v1/get-pools-by-cointypes?coinInType=${coinInType}&coinOutType=${coinOutType}&network=${network}`
      );

      const serverPools = (await fetchRes.json()) as AmmServerPool[];

      if (!serverPools.length) {
        const returnValue = { dex: {}, poolsMap: {} };

        cache.set(key, returnValue);

        return returnValue;
      }

      const ammPools = serverPools.map((x) => convertServerPoolToClientPool(x));

      const poolsMap = ammPools.reduce(
        (acc, pool) => ({
          ...acc,
          [pool.poolId]: pool,
        }),
        {} as PoolsMap
      );

      const dex = constructDex(ammPools);

      const returnValue = { dex, poolsMap };

      cache.set(key, returnValue);

      return returnValue;
    }
  );
};
