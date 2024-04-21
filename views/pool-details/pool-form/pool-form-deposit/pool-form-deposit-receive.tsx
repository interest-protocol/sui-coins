import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { FixedPointMath } from '@/lib';
import { PoolForm } from '@/views/pools/pools.types';

import { getAmmLpCoinAmount } from '../pool-form.utils';

const PoolFormDepositReceive: FC = () => {
  const { control, getValues, setValue } = useFormContext<PoolForm>();
  const value = useWatch({ control, name: 'lpCoin.value' });
  const symbol = useWatch({ control, name: 'lpCoin.symbol' });
  const tokenList = useWatch({ control, name: 'tokenList' });

  useEffect(() => {
    const pool = getValues('pool');

    if (!pool || !tokenList.length) return;

    if (isClammPool(pool)) {
      // TODO: CLAMM approach

      return;
    }

    // AMM Approach
    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    const lpAmount = getAmmLpCoinAmount(
      FixedPointMath.toBigNumber(coin0.value, coin0.decimals),
      FixedPointMath.toBigNumber(coin1.value, coin1.decimals),
      pool.balanceX,
      pool.balanceY,
      pool.lpCoinSupply
    );

    setValue('lpCoin.value', FixedPointMath.toNumber(lpAmount).toString());
  }, [tokenList]);

  return (
    <Box>
      <Typography variant="body" size="large" mb="m">
        You will receive (estimated):
      </Typography>
      <Box borderRadius="xs" bg="lowestContainer" py="xs">
        <Box
          py="xs"
          px="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body" size="large">
            {symbol}
          </Typography>
          <Typography variant="body" ml="m" size="large">
            {value}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolFormDepositReceive;
