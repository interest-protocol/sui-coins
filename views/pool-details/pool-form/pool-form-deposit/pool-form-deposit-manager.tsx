import { Box, Typography } from '@interest-protocol/ui-kit';
import { type FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import { parseBigNumberish } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

const DepositManager: FC = () => {
  const clamm = useClammSdk();
  const { control, getValues, setValue } = useFormContext<PoolForm>();
  const [tokens] = useDebounce(useWatch({ control, name: 'tokenList' }), 800);

  const handleQuoteAddLiquidity = async () => {
    try {
      setValue('isFindingPool', true);
      const poolId = getValues('pool.poolObjectId');
      const lpCoinDecimals = getValues('lpCoin.decimals');

      const value = await clamm.quoteAddLiquidity({
        pool: poolId,
        amounts: tokens.map(({ value, decimals }) =>
          BigInt(
            FixedPointMath.toBigNumber(value, decimals)
              .decimalPlaces(0)
              .toString()
          )
        ),
      });

      setValue(
        'lpCoin.value',
        String(
          FixedPointMath.toNumber(parseBigNumberish(value), lpCoinDecimals)
        )
      );
    } catch (e) {
      setValue('lpCoin.value', (e as Error).message);
    } finally {
      setValue('isFindingPool', false);
    }
  };

  useEffect(() => {
    if (tokens.some(({ value }) => Number(value))) {
      handleQuoteAddLiquidity();
      return;
    }

    if (Number(getValues('lpCoin.value'))) setValue('lpCoin.value', '0');
  }, [tokens]);

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

export default DepositManager;
