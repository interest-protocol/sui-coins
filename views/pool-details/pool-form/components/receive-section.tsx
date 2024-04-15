import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { PoolForm } from '@/views/pools/pools.types';

import { getAmmLpCoinAmount } from '../pool-form.utils';

const PoolReceiveSection: FC = () => {
  const { control, getValues } = useFormContext<PoolForm>();
  const symbol = useWatch({ control, name: 'lpCoin.symbol' });
  const tokenList = useWatch({ control, name: 'tokenList' });
  const [lpAmount, setLpAmount] = useState('0');

  useEffect(() => {
    const pool = getValues('pool');

    if (!pool || !tokenList.length) return;

    const coin0 = tokenList[0];
    const coin1 = tokenList[1];

    const lpAmount = getAmmLpCoinAmount(
      FixedPointMath.toBigNumber(coin0.value, coin0.decimals),
      FixedPointMath.toBigNumber(coin1.value, coin1.decimals),
      pool.balanceX,
      pool.balanceY,
      pool.lpCoinSupply
    );

    setLpAmount(FixedPointMath.toNumber(lpAmount).toString());
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
            {lpAmount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolReceiveSection;
