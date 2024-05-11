import {
  InterestPool,
  PoolMetadata,
  QueryPoolsReturn,
} from '@interest-protocol/clamm-sdk';
import useSWR from 'swr';

import { chunk } from '@/utils';
import { makeSWRKey } from '@/utils';

import { useClammSdk } from '../use-clamm-sdk';

export const usePool = (poolId: string) => {
  const clamm = useClammSdk();

  return useSWR<InterestPool>(
    makeSWRKey([poolId], usePool.name),
    async () => clamm.getPool(poolId),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};

export const usePools = (page: number, findQuery = {}) => {
  const clamm = useClammSdk();
  return useSWR<QueryPoolsReturn<InterestPool>>(
    makeSWRKey([page], usePools.name),
    async () => {
      const res = await fetch(
        `api/auth/v1/get-all-clamm-pools?page=${page}&limit=50&find=${JSON.stringify(findQuery)}`
      );

      const data = (await res.json()) as QueryPoolsReturn<PoolMetadata>;

      // @dev The RPC has a limit of requests
      const batches = chunk(data.pools, 20);

      const interestPools = [];

      for (const batch of batches) {
        const pools = await clamm.getPoolsFromMetadata(batch);

        interestPools.push(...pools);
      }

      return {
        pools: interestPools,
        totalPages: data.totalPages,
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};
