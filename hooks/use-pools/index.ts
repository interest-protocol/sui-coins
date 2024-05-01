import { useSuiClient } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { AmmPool, AmmServerPool } from '@/interface';
import { convertServerPoolToClientPool, fetchPool, makeSWRKey } from '@/utils';

import { UsePoolsFetchReturn, UsePoolsReturn } from './use-pools.types';

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

export const usePools = (page: number = 1) =>
  useSWR<UsePoolsReturn>(
    `/api/auth/v1/get-pools?pageNumber=${page}`,
    async () => {
      const res = await fetch(`/api/auth/v1/get-pools?pageNumber=${page}`);
      const { pools, totalItems } = (await res.json()) as UsePoolsFetchReturn;

      return {
        pools: pools.map((x) => convertServerPoolToClientPool(x)),
        totalItems,
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
