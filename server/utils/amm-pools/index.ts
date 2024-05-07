import { isValidSuiObjectId } from '@mysten/sui.js/utils';
import { toString } from 'ramda';
import invariant from 'tiny-invariant';

import { PAGE_SIZE } from '@/constants';
import { AmmPool } from '@/interface';
import { AMMPoolModel, getAmmPoolModel } from '@/server/model/amm-pool';
import { fetchPool, fetchPools } from '@/utils';

import {
  GetAllPoolsArgs,
  GetPoolsByCoinTypes,
  GetPoolsByLpCoins,
  SavePoolArgs,
} from './amm-pools.types';

export const savePool = async ({ client, poolId, network }: SavePoolArgs) => {
  invariant(isValidSuiObjectId(poolId), 'Invalid pool id');

  const ammPoolModel = getAmmPoolModel(network);

  const exists = await ammPoolModel.findOne({ poolObjectId: poolId });

  invariant(exists == undefined, 'Pool already saved');

  const pool = await fetchPool(client, poolId);
  invariant(pool, `Wrong pool ${poolId}`);

  const newPool = await ammPoolModel.create({
    poolObjectId: pool.poolId,
    stateId: pool.stateId,
    coinX: pool.coinTypes.coinX,
    coinY: pool.coinTypes.coinY,
    lpCoinType: pool.coinTypes.lpCoin,
    isVolatile: pool.isVolatile,
  });

  await newPool.save();

  return newPool;
};

export const getAllPools = async ({
  client,
  network,
  pageNumber,
}: GetAllPoolsArgs): Promise<[AmmPool[], number]> => {
  const ammPoolModel = getAmmPoolModel(network);

  const totalItems = await ammPoolModel.countDocuments();

  const pools = await ammPoolModel
    .find({})
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

export const getPoolsByCoinTypes = async ({
  client,
  network,
  coinInType,
  coinOutType,
}: GetPoolsByCoinTypes): Promise<readonly AmmPool[]> => {
  const query = {
    $or: [
      { coinX: coinInType },
      { coinX: coinOutType },
      { coinY: coinInType },
      { coinY: coinOutType },
    ],
  };

  const ammPoolModel = getAmmPoolModel(network);

  const pools = (await ammPoolModel.find(query)) as readonly AMMPoolModel[];

  if (!pools || !pools.length) return [];

  return await fetchPools(
    client,
    pools.map((x) => x.poolObjectId),
    pools.map((x) => x.stateId)
  );
};

export const getPoolsByLpCoins = async ({
  client,
  network,
  lpCoins,
}: GetPoolsByLpCoins): Promise<readonly AmmPool[]> => {
  const query = {
    lpCoinType: { $in: lpCoins },
  };

  const ammPoolModel = getAmmPoolModel(network);

  const pools = (await ammPoolModel.find(query)) as readonly AMMPoolModel[];

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
