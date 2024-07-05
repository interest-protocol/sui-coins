import { normalizeStructTag } from '@mysten/sui/utils';

import { Network } from '@/constants';

import { getClammPoolModel } from '../model/clamm-pool';

export const normalizePoolsLpCoin = async () => {
  const clammModel = getClammPoolModel(Network.MAINNET);

  const pools = await clammModel.find({});

  await Promise.all(
    pools.map((pool) => {
      pool.lpCoinType = normalizeStructTag(pool.lpCoinType);
      return pool.save();
    })
  );
};
