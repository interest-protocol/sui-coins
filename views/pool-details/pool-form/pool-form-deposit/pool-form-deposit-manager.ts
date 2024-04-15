import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import {
  getAmmOptimalCoin0Value,
  getAmmOptimalCoin1Value,
} from '@/views/pool-details/pool-form/pool-form.utils';
import { PoolForm } from '@/views/pools/pools.types';

const DepositManager: FC = () => {
  const { control, setValue, getValues } = useFormContext<PoolForm>();

  const token0Amount = useWatch({ control, name: 'tokenList.0.value' });
  const token1Amount = useWatch({ control, name: 'tokenList.1.value' });

  const input0IsLocked = useWatch({ control, name: 'tokenList.0.locked' });
  const input1IsLocked = useWatch({ control, name: 'tokenList.1.locked' });

  // user is typing on input0
  useEffect(() => {
    const { tokenList, pool } = getValues();

    if (!tokenList.length || !pool) return;
    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    if (input1IsLocked) return;

    if (!+token0Amount) {
      setValue('tokenList.1.value', '0');
      return;
    }

    const n = getAmmOptimalCoin1Value(
      FixedPointMath.toBigNumber(token0Amount, coin0.decimals),
      pool.balanceX,
      pool.balanceY
    ).dividedBy(new BigNumber(10).pow(coin1.decimals));

    const roundedN =
      n.lt(new BigNumber(1)) && !coin1.decimals
        ? 0
        : n.decimalPlaces(coin1.decimals, BigNumber.ROUND_UP).toNumber();

    setValue('tokenList.1.value', roundedN.toString());
  }, [token0Amount, input1IsLocked]);

  // user is typing on input1
  useEffect(() => {
    const { tokenList, pool } = getValues();

    if (!tokenList.length || !pool) return;

    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    if (input0IsLocked) return;

    if (!+token1Amount) {
      setValue('tokenList.0.value', '0');
      return;
    }

    const n = getAmmOptimalCoin0Value(
      FixedPointMath.toBigNumber(token1Amount, coin1.decimals),
      pool.balanceX,
      pool.balanceY
    ).dividedBy(new BigNumber(10).pow(coin0.decimals));

    const roundedN =
      n.lt(new BigNumber(1)) && !coin0.decimals
        ? 0
        : n.decimalPlaces(coin0.decimals, BigNumber.ROUND_UP).toNumber();

    setValue('tokenList.0.value', roundedN.toString());
  }, [token1Amount, input0IsLocked]);

  return null;
};

export default DepositManager;
