import { PAGE_SIZE } from '@/constants';
import { getClammPoolModel } from '@/server/model/clamm-pool';

import { GetClammPoolsArgs, GetClammPoolsByCoinTypesArgs } from './pools.types';

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
