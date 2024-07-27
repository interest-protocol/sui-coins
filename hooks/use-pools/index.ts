import { useSuiClient } from '@mysten/dapp-kit';
import { getSuiObjectResponseFields } from '@polymedia/suits';
import { keys } from 'ramda';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { AmmPool, AmmServerPool } from '@/interface';
import { convertServerPoolToClientPool, fetchPool, makeSWRKey } from '@/utils';

import { UsePoolsFetchReturn, UsePoolsReturn } from './use-pools.types';
import { parsePool } from './use-pools.utils';

export const usePool = (parentId: string) => {
  const client = useSuiClient();

  return useSWR<AmmPool | null>(
    makeSWRKey([], usePool.name + parentId),
    async () => {
      if (!parentId) return null;

      const pool = (await fetchPool(client, parentId)) as AmmServerPool | null;

      return pool ? convertServerPoolToClientPool(pool) : null;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};

export const usePools = (page: number = 1, findQuery = {}) => {
  const network = useNetwork();

  return useSWR<UsePoolsReturn>(
    `/api/auth/v1/get-pools?page=${page}&find=${JSON.stringify(findQuery)}&network=${network}`,
    async () => {
      const res = await fetch(
        `/api/auth/v1/get-pools?page=${page}&find=${JSON.stringify(findQuery)}&network=${network}`
      );
      const { pools, totalPages } = (await res.json?.()) as UsePoolsFetchReturn;

      return {
        done: true,
        totalPages,
        pools: pools ?? [],
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};

export const usePoolsMetadata = (poolStateIds: Record<string, string>) => {
  const suiClient = useSuiClient();

  return useSWR(poolStateIds, async () => {
    const data = await suiClient.multiGetObjects({
      ids: keys(poolStateIds),
      options: { showContent: true },
    });

    return data.reduce(
      (acc, state) => ({
        ...acc,
        [poolStateIds[state.data!.objectId]]: {
          poolId: poolStateIds[state.data!.objectId],
          ...parsePool(getSuiObjectResponseFields(state)),
        },
      }),
      {} as Record<string, AmmPool>
    );
  });
};
