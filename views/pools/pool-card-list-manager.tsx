import { values } from 'ramda';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { usePoolsMetadata } from '@/hooks/use-pools';

import { AMMPoolWithMetadata } from './pools.types';

interface PoolsCardListManagerProps {
  pools: Record<string, AMMPoolWithMetadata>;
  setPools: Dispatch<SetStateAction<Record<string, AMMPoolWithMetadata>>>;
}

const PoolsCardListManager: FC<PoolsCardListManagerProps> = ({
  pools,
  setPools,
}) => {
  const poolsWithoutMetadataStateIds = values(pools).reduce(
    (acc, { metadata, stateId, poolObjectId }) =>
      !metadata ? { ...acc, [stateId]: poolObjectId } : acc,
    {} as Record<string, string>
  );

  const { data, isLoading, error } = usePoolsMetadata(
    poolsWithoutMetadataStateIds
  );

  useEffect(() => {
    if (!isLoading && !error && data) {
      setPools({
        ...values(pools).reduce(
          (acc, pool) => ({
            ...acc,
            [pool.poolObjectId]: {
              ...pool,
              ...(poolsWithoutMetadataStateIds[pool.stateId]
                ? { metadata: data[pool.poolObjectId] }
                : {}),
            },
          }),
          {}
        ),
      });
    }
  }, [data]);

  return null;
};

export default PoolsCardListManager;
