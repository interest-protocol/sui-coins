import {
  InterestPool,
  PoolMetadata,
  QueryPoolsReturn,
} from '@interest-protocol/clamm-sdk';
import useSWR from 'swr';

import { useNetwork } from '@/hooks/use-network';
import { chunk, handleCustomPools } from '@/utils';
import { makeSWRKey } from '@/utils';

import { useClammSdk } from '../use-clamm-sdk';

export const usePool = (poolId: string) => {
  const clamm = useClammSdk();
  const network = useNetwork();

  return useSWR<InterestPool>(
    makeSWRKey([poolId, network], usePool.name),
    async () => {
      const pool = await clamm.getPool(poolId);
      return handleCustomPools({ pool, network });
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};

export const usePools = (page: number, findQuery = {}) => {
  const clamm = useClammSdk();
  const network = useNetwork();
  return useSWR<QueryPoolsReturn<InterestPool>>(
    makeSWRKey([page, network, findQuery], usePools.name),
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
        pools: interestPools.map((x) =>
          handleCustomPools({ pool: x, network })
        ),
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
