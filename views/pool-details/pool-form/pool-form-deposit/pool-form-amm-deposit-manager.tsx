import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import {
  getAmmOptimalCoin0Value,
  getAmmOptimalCoin1Value,
} from '@/views/pool-details/pool-form/pool-form.utils';
import { PoolForm } from '@/views/pools/pools.types';

const AmmDepositManager: FC = () => {
  const { control, setValue, getValues } = useFormContext<PoolForm>();

  const token0Amount = useWatch({ control, name: 'tokenList.0.value' });
  const token1Amount = useWatch({ control, name: 'tokenList.1.value' });

  const input0IsLocked = useWatch({ control, name: 'tokenList.0.locked' });
  const input1IsLocked = useWatch({ control, name: 'tokenList.1.locked' });

  // user is typing on input0
  useEffect(() => {
    const { tokenList, pool } = getValues();

    if (!tokenList.length || !pool || isClammPool(pool)) return;
    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    if (input1IsLocked) return;

    if (!+token0Amount) {
      setValue('tokenList.1.value', '0');
      return;
    }

    const optimalAmountY = getAmmOptimalCoin1Value(
      FixedPointMath.toBigNumber(token0Amount, coin0.decimals),
      pool.balanceX,
      pool.balanceY
    );

    const n = optimalAmountY.dividedBy(new BigNumber(10).pow(coin1.decimals));

    const roundedN =
      n.lt(new BigNumber(1)) && !coin1.decimals
        ? 0
        : n.decimalPlaces(coin1.decimals, BigNumber.ROUND_UP).toNumber();

    setValue('tokenList.1.value', roundedN.toString());
  }, [token0Amount, input1IsLocked]);

  // user is typing on input1
  useEffect(() => {
    const { tokenList, pool } = getValues();

    if (!tokenList.length || !pool || isClammPool(pool)) return;

    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    if (input0IsLocked) return;

    if (!+token1Amount) {
      setValue('tokenList.0.value', '0');
      return;
    }

    const optimalAmountX = getAmmOptimalCoin0Value(
      FixedPointMath.toBigNumber(token1Amount, coin1.decimals),
      pool.balanceX,
      pool.balanceY
    );

    const n = optimalAmountX.dividedBy(new BigNumber(10).pow(coin0.decimals));

    const roundedN =
      n.lt(new BigNumber(1)) && !coin0.decimals
        ? 0
        : n.decimalPlaces(coin0.decimals, BigNumber.ROUND_UP).toNumber();

    setValue('tokenList.0.value', roundedN.toString());
  }, [token1Amount, input0IsLocked]);

  const error = useWatch({ control, name: 'error' });

  if (!error) return null;

  return (
    <Box
      p="s"
      mx="xl"
      gap="s"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      bg="errorContainer"
      color="onErrorContainer"
      borderColor="onErrorContainer"
    >
      <DotErrorSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      <Typography variant="label" size="medium">
        {error}
      </Typography>
    </Box>
  );
};

export default AmmDepositManager;
