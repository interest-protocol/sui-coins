import { isValidSuiObjectId } from '@mysten/sui/utils';
import invariant from 'tiny-invariant';

import { Network, PAGE_SIZE } from '@/constants';
import { CLAMM } from '@/server/clients';
import { getClammPoolModel } from '@/server/model/clamm-pool';

import {
  GetClammPoolsArgs,
  GetClammPoolsArgsWithFindQuery,
  GetClammPoolsByCoinTypesArgs,
  SavePoolArgs,
} from './pools.types';

export const getClammPools = async ({
  network,
  page,
  limit,
}: GetClammPoolsArgs) => {
  const clammModel = getClammPoolModel(network);
  const safeLimit = limit > PAGE_SIZE ? PAGE_SIZE : limit;

  const pools = await clammModel
    .find({})
    .skip((page - 1) * safeLimit)
    .limit(safeLimit);

  const totalCount = await clammModel.countDocuments();
  const totalPages = Math.ceil(totalCount / safeLimit);

  return {
    pools,
    totalPages,
  };
};

export const getClammPoolsWithFindQuery = async ({
  network,
  page,
  limit,
  findQuery,
}: GetClammPoolsArgsWithFindQuery) => {
  const clammModel = getClammPoolModel(network);
  const safeLimit = limit > PAGE_SIZE ? PAGE_SIZE : limit;

  const pools = await clammModel
    .find(findQuery)
    .skip((page - 1) * safeLimit)
    .limit(safeLimit);

  const totalCount = await clammModel.countDocuments();
  const totalPages = Math.ceil(totalCount / safeLimit);

  return {
    pools,
    totalPages,
  };
};

export const getClammPoolsByCoinTypes = async ({
  network,
  coinTypes,
}: GetClammPoolsByCoinTypesArgs) => {
  const clammModel = getClammPoolModel(network);

  const query = { coinTypes: { $in: coinTypes } };

  return clammModel.find(query);
};

export const getClammPoolsByLpCoinTypes = async ({
  network,
  coinTypes,
}: GetClammPoolsByCoinTypesArgs) => {
  const clammModel = getClammPoolModel(network);

  const query = { lpCoinType: { $in: coinTypes } };

  return clammModel.find(query);
};

export const savePool = async ({ poolId, network }: SavePoolArgs) => {
  invariant(isValidSuiObjectId(poolId), 'Invalid pool id');
  invariant(Object.values(Network).includes(network), 'Unsupported network');

  const clammModel = getClammPoolModel(network);

  const exists = await clammModel.findOne({ poolObjectId: poolId });

  invariant(exists == undefined, 'Pool already saved');

  const pool = await CLAMM.getPool(poolId);
  invariant(pool, `Wrong pool ${poolId}`);

  const newPool = await clammModel.create({
    poolObjectId: pool.poolObjectId,
    lpCoinType: pool.lpCoinType,
    isStable: pool.isStable,
    coinTypes: pool.coinTypes,
  });

  await newPool.save();

  return newPool;
};
