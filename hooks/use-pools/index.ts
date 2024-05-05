import { InterestPool, QueryPoolsReturn } from '@interest-protocol/clamm-sdk';
import useSWR from 'swr';

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

export const usePools = (page: number) => {
  const clamm = useClammSdk();

  return useSWR<QueryPoolsReturn>(
    makeSWRKey([page], usePools.name),
    async () => clamm.getPools(),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};
