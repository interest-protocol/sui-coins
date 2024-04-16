import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import { PoolForm } from '@/views/pools/pools.types';

const WithdrawManager: FC = () => {
  const { coinsMap } = useWeb3();
  const { control, setValue } = useFormContext<PoolForm>();

  const error = useWatch({ control, name: 'error' });
  const lpCoin = useWatch({ control, name: 'lpCoin' });

  useEffect(() => {
    if (lpCoin && coinsMap) {
      if (
        !coinsMap[lpCoin.type]?.balance ||
        Number(lpCoin.value) >
          FixedPointMath.toNumber(
            coinsMap[lpCoin.type].balance,
            coinsMap[lpCoin.type].decimals
          )
      ) {
        setValue(
          'error',
          `The ${lpCoin.symbol} amount is superior than your balance, try to reduce`
        );
        return;
      }
    }
    setValue('error', null);
  }, [lpCoin]);

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

export default WithdrawManager;
