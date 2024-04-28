import { SuiClient } from '@mysten/sui.js/client';
import { isValidSuiObjectId } from '@mysten/sui.js/utils';
import { toString } from 'ramda';
import invariant from 'tiny-invariant';

import { AmmPool } from '@/interface';
import PoolDevnet, { PoolModel } from '@/server/model/pool-devnet';
import { fetchPool, fetchPools } from '@/utils';

export const savePool = async (client: SuiClient, poolId: string) => {
  invariant(isValidSuiObjectId(poolId), 'Invalid pool id');

  const exists = await PoolDevnet.findOne({ poolObjectId: poolId });

  invariant(exists == undefined, 'Pool already saved');

  const pool = await fetchPool(client, poolId);
  invariant(pool, `Wrong pool ${poolId}`);

  const newPool = await PoolDevnet.create({
    poolObjectId: pool.poolId,
    stateId: pool.stateId,
    coinX: pool.coinTypes.coinX,
    coinY: pool.coinTypes.coinY,
    isVolatile: pool.isVolatile,
  });

  await newPool.save();

  return newPool;
};

export const getAllPools = async (client: SuiClient): Promise<AmmPool[]> => {
  let pools = (await PoolDevnet.find({})) || [];

  if (pools && pools.length) {
    pools = await fetchPools(
      client,
      (pools as PoolModel[]).map((x) => x.stateId)
    );
  }

  return pools;
};

export const handleServerError = (
  e: unknown,
  defaultMessage = `Error from server: ${toString(e)}`
) => (e instanceof Error ? e.message : defaultMessage);
