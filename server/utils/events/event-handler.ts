import { SuiEvent } from '@mysten/sui.js/client';
import { isValidSuiObjectId } from '@mysten/sui.js/utils';
import { normalizeSuiObjectId } from '@mysten/sui.js/utils';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import { has, pathOr, propOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import { getClammPoolModel } from '@/server/model/clamm-pool';

export const savePoolMainnetEvents = async (data: SuiEvent[]) => {
  const model = getClammPoolModel(Network.MAINNET);

  const newPoolEvents = data.filter((x) => x.type.includes('New'));

  const poolsToSave: any[] = [];

  newPoolEvents.forEach((event) => {
    const poolObjectId = propOr('', 'pool', event.parsedJson);
    const coins = propOr('', 'coins', event.parsedJson);
    const lpCoin = pathOr('', ['lpCoin', 'name'], event.parsedJson);
    const isStable = propOr('', 'isStable', event.parsedJson);

    invariant(
      poolObjectId &&
        typeof poolObjectId === 'string' &&
        isValidSuiObjectId(poolObjectId),
      ' Failed to get sui object id'
    );
    invariant(
      Array.isArray(coins) && has('name', coins[0]),
      ' Failed to get coin types'
    );
    invariant(typeof lpCoin === 'string', 'LpCoin is not found');
    invariant(typeof isStable === 'boolean', 'isStable is not found');

    const pool = {
      isStable,
      poolObjectId: normalizeSuiObjectId(poolObjectId),
      lpCoinType: lpCoin,
      coinTypes: coins.map((x) => normalizeStructTag(x.name)),
    };

    const updateOperation = {
      updateOne: {
        filter: { poolObjectId: pool.poolObjectId },
        update: { $setOnInsert: pool },
        upsert: true,
      },
    };

    poolsToSave.push(updateOperation);
  });

  model.bulkWrite(poolsToSave);
};
