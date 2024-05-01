import useSWR from 'swr';

import { AmmPool, AmmServerPool } from '@/interface';
import { convertServerPoolToClientPool, fetchPool, makeSWRKey } from '@/utils';

import { useMovementClient } from '../use-movement-client';
import { UsePoolsFetchReturn, UsePoolsReturn } from './use-pools.types';

export const usePool = (parentId: string) => {
  const client = useMovementClient();

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

export const usePools = () =>
  useSWR<UsePoolsReturn>(
    `/api/auth/v1/get-pools`,
    async () => {
      const res = await fetch('/api/auth/v1/get-pools');
      const { pools, totalPages } = (await res.json()) as UsePoolsFetchReturn;

      return {
        pools: pools.map((x) => convertServerPoolToClientPool(x)),
        totalPages,
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
