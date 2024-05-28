import { InterestPool } from '@interest-protocol/clamm-sdk';

import { SCALLOP_POOLS_MAP, WRAPPED_CONVERSION_MAP } from '@/constants/clamm';

import { handleCustomPoolsArgs, IsScallopPoolArgs } from './pool.types';

export const isScallopPool = ({ poolObjectId, network }: IsScallopPoolArgs) =>
  SCALLOP_POOLS_MAP[network][poolObjectId];

export const handleCustomPools = ({
  pool,
  network,
}: handleCustomPoolsArgs): InterestPool => {
  if (!isScallopPool({ network, poolObjectId: pool.poolObjectId })) return pool;

  return {
    ...pool,
    coinTypes: pool.coinTypes.map((x) =>
      WRAPPED_CONVERSION_MAP[network][x]
        ? WRAPPED_CONVERSION_MAP[network][x]
        : x
    ),
  };
};
