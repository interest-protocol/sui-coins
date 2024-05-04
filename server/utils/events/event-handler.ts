import { SuiEvent } from '@mysten/sui.js/client';
import { isValidSuiObjectId } from '@mysten/sui.js/utils';
import { normalizeSuiObjectId } from '@mysten/sui.js/utils';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import { has, propOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import { ClammPoolType, getClammPoolModel } from '@/server/model/clamm-pool';

const parseType = (x: SuiEvent) => {
  return {
    isStable: x.type.split('<')[1].split(',')[0].includes('Stable'),
    lpCoin: normalizeStructTag(
      x.type.split('<')[1].split(',')[1].trim().slice(0, -1)
    ),
  };
};

export const savePoolMainnetEvents = async (data: SuiEvent[]) => {
  const model = getClammPoolModel(Network.MAINNET);

  const newPoolEvents = data.filter((x) => x.type.includes('New'));

  const poolsToSave: ClammPoolType[] = [];

  newPoolEvents.forEach((event) => {
    const { isStable, lpCoin } = parseType(event);

    const poolObjectId = propOr('', 'pool', event.parsedJson);
    const coins = propOr('', 'coins', event.parsedJson);

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

    invariant(
      poolObjectId && typeof poolObjectId === 'string',
      'Failed to get pool object id'
    );
    invariant(coins && Array.isArray(coins), 'Failed to get coins');

    poolsToSave.push({
      isStable,
      poolObjectId: normalizeSuiObjectId(poolObjectId),
      lpCoinType: lpCoin,
      coinTypes: coins.map((x) => normalizeStructTag(x.name)),
    });
  });

  model.insertMany(poolsToSave);
};
