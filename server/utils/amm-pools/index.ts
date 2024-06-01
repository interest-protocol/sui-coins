import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { isValidSuiObjectId } from '@mysten/sui.js/utils';
import { toString } from 'ramda';
import invariant from 'tiny-invariant';

import {
  BTC_TYPE,
  ETH_TYPE,
  PAGE_SIZE,
  USDC_TYPE,
  USDT_TYPE,
} from '@/constants';
import { AmmPool } from '@/interface';
import { AMMPoolModel, getAmmPoolModel } from '@/server/model/amm-pool';
import { fetchPool, fetchPools } from '@/utils';

import {
  GetPoolsArgsWithFindQuery,
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
  page,
  network,
  findQuery,
}: GetPoolsArgsWithFindQuery): Promise<[AMMPoolModel[], number]> => {
  const ammPoolModel = getAmmPoolModel(network);

  const pools = await ammPoolModel
    .find(findQuery)
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);

  const totalCount = await ammPoolModel.countDocuments();
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return [pools, totalPages];
};

const baseCoins = [USDT_TYPE, USDC_TYPE, BTC_TYPE, ETH_TYPE, SUI_TYPE_ARG];

export const getPoolsByCoinTypes = async ({
  client,
  network,
  coinInType,
  coinOutType,
}: GetPoolsByCoinTypes): Promise<readonly AmmPool[]> => {
  const basePools = baseCoins.flatMap((baseType) => [
    {
      coinX: baseType,
      coinY: coinOutType,
    },
    {
      coinX: coinOutType,
      coinY: baseType,
    },
    {
      coinX: baseType,
      coinY: coinInType,
    },
    {
      coinX: coinInType,
      coinY: baseType,
    },
  ]);

  const query = {
    $or: [
      { coinX: coinInType, coinY: coinOutType },
      { coinX: coinOutType, coinY: coinInType },
    ].concat(basePools),
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
