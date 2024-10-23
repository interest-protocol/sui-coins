import { CoinStruct } from '@mysten/sui/dist/cjs/client';
import BigNumber from 'bignumber.js';

import { FixedPointMath } from '@/lib';
import { chunk, getCoins, splitArray } from '@/utils';

import { GetObjectsToMergeArgs } from './merge.types';

export const MERGE_OBJECTS_LIMIT = 200;

export const getObjectsToMerge = async ({
  account,
  suiClient,
  coinsToMerge,
}: GetObjectsToMergeArgs) => {
  const objectsToMerge: Array<
    [string, ReadonlyArray<ReadonlyArray<CoinStruct>>]
  > = [];

  for (const coinsToMergeChunk of chunk(coinsToMerge, 10)) {
    const objects = await Promise.all(
      coinsToMergeChunk.map(({ type }) =>
        getCoins({
          account,
          suiClient,
          coinType: type,
        })
      )
    );

    objects.forEach((coinObjects) => {
      const sortedCoinObjects = coinObjects.toSorted((a, b) =>
        FixedPointMath.toNumber(
          BigNumber(b.balance).minus(BigNumber(a.balance))
        )
      );

      objectsToMerge.push([
        sortedCoinObjects[0].coinObjectId,
        splitArray(sortedCoinObjects.slice(1), MERGE_OBJECTS_LIMIT),
      ]);
    });
  }

  return objectsToMerge;
};
