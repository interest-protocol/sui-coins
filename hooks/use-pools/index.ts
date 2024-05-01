import useSWR from 'swr';

import { AmmPool, AmmServerPool } from '@/interface';
import { convertServerPoolToClientPool, fetchPool, makeSWRKey } from '@/utils';

import { useMovementClient } from '../use-movement-client';

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
  useSWR<ReadonlyArray<AmmPool>>(
    `/api/auth/v1/get-pools`,
    async () => {
      const res = await fetch('/api/auth/v1/get-pools');
      const pools = (await res.json()) as AmmServerPool[];

      return pools.map(convertServerPoolToClientPool);
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
