import BigNumber from 'bignumber.js';

import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import { ObjectField } from '@/views/send/send-forms/send-simple/send-simple.types';

export const getAmountsMap = (
  balances: { amount: bigint; coinType: string }[]
) =>
  balances.reduce(
    (acc, { coinType, amount }) => ({
      ...acc,
      [coinType]: BigNumber(String(amount)),
    }),
    {} as Record<`0x${string}`, BigNumber>
  );

export const getAmountsMapFromObjects = (objects: ReadonlyArray<ObjectField>) =>
  objects.reduce(
    (acc, object) => {
      if (!object.display?.type) return acc;
      if (!object.display?.balance) return acc;

      return {
        ...acc,
        [object.display.type]: FixedPointMath.toBigNumber(
          object.value,
          object.display.decimals as number
        ).plus(acc[object.display.type as `0x${string}`] || ZERO_BIG_NUMBER),
      };
    },
    {} as Record<`0x${string}`, BigNumber>
  );
