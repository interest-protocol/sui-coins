import { SuiEvent } from '@mysten/sui.js/client';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import { propOr } from 'ramda';
import invariant from 'tiny-invariant';

import { Network } from '@/constants';
import {
  ClammPoolType,
  getClammPoolModel,
} from '@/server/model/mainnet/clamm-pool';

const parseType = (x: SuiEvent) => {
  const types = x.type.split('<').slice(1)[0].split(',');
  const [curve, ...coins] = types.slice(0, -1);
  const lpCoin = types.slice(-1)[0].trim();

  return {
    isStable: curve.includes('Stable'),
    lpCoin: normalizeStructTag(lpCoin.trim()),
    coins: coins.map((x) => normalizeStructTag(x.trim())),
  };
};

export const savePoolMainnetEvents = async (data: SuiEvent[]) => {
  const model = getClammPoolModel(Network.MAINNET);

  const newPoolEvents = data.filter((x) => x.type.includes('New'));

  const poolsToSave: ClammPoolType[] = [];

  newPoolEvents.forEach((event) => {
    const { isStable, coins, lpCoin } = parseType(event);
    const poolObjectId = propOr('', 'pool', event.parsedJson);
    invariant(poolObjectId, 'Failed to get pool object id');
    invariant(typeof poolObjectId === 'string', 'Failed to get pool object id');

    poolsToSave.push({
      isStable,
      poolObjectId,
      lpCoinType: lpCoin,
      coinTypes: coins,
    });
  });

  console.log('pools to save', poolsToSave);
  const r = await model.insertMany(poolsToSave);

  console.log(r);
};
