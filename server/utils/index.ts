import { SuiClient } from '@mysten/sui.js/client';
import { isValidSuiObjectId } from '@mysten/sui.js/utils';
import { toString } from 'ramda';
import invariant from 'tiny-invariant';

import { PAGE_SIZE } from '@/constants';
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

export const getAllPools = async (
  client: SuiClient,
  pageNumber: number
): Promise<[AmmPool[], number]> => {
  const totalItems = await PoolDevnet.countDocuments();

  const pools = await PoolDevnet.find({})
    .skip((pageNumber - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);

  if (!pools || !pools.length) return [[], 0];

  return [
    await fetchPools(
      client,
      pools.map((x) => x.poolObjectId),
      pools.map((x) => x.stateId)
    ),
    totalItems,
  ];
};

export const getPoolsByCoinTypes = async (
  client: SuiClient,
  coinInType: string,
  coinOutType: string
): Promise<readonly AmmPool[]> => {
  const query = {
    $or: [
      { coinX: coinInType },
      { coinX: coinOutType },
      { coinY: coinInType },
      { coinY: coinOutType },
    ],
  };

  const pools = (await PoolDevnet.find(query)) as readonly PoolModel[];

  if (!pools || !pools.length) return [];

  return await fetchPools(
    client,
    pools.map((x) => x.poolObjectId),
    pools.map((x) => x.stateId)
  );
};

export const handleServerError = (
  e: unknown,
  defaultMessage = `Error from server: ${toString(e)}`
) => (e instanceof Error ? e.message : defaultMessage);
