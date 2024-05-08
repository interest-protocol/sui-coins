import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import { parseBigNumberish } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

const WithdrawManager: FC = () => {
  const clamm = useClammSdk();
  const { coinsMap } = useWeb3();
  const { control, setValue, getValues } = useFormContext<PoolForm>();

  const error = useWatch({ control, name: 'error' });
  const value = useWatch({ control, name: 'lpCoin.value' });
  const tokenSelected = useWatch({ control, name: 'tokenSelected' });

  const handleQuoteRemoveLiquidity = async () => {
    try {
      setValue('isFindingPool', true);
      const tokenList = getValues('tokenList');
      const poolId = getValues('pool.poolObjectId');
      const lpCoinDecimals = getValues('lpCoin.decimals');

      if (tokenSelected) {
        const minQuote = await clamm.quoteRemoveLiquidityOneCoin({
          pool: poolId,
          coinOutType: tokenSelected,
          amount: BigInt(
            FixedPointMath.toBigNumber(value, lpCoinDecimals)
              .decimalPlaces(0)
              .toString()
          ),
        });

        setValue(
          'tokenList',
          tokenList.map((token) => ({
            ...token,
            value:
              token.type === tokenSelected
                ? String(
                    FixedPointMath.toNumber(
                      parseBigNumberish(minQuote),
                      token.decimals
                    )
                  )
                : '0',
          }))
        );

        return;
      }

      const minQuotes = await clamm.quoteRemoveLiquidity({
        pool: poolId,
        amount: BigInt(
          FixedPointMath.toBigNumber(value, lpCoinDecimals)
            .decimalPlaces(0)
            .toString()
        ),
      });

      setValue(
        'tokenList',
        tokenList.map((token, index) => ({
          ...token,
          value: String(
            FixedPointMath.toNumber(
              parseBigNumberish(minQuotes[index]),
              token.decimals
            )
          ),
        }))
      );
    } catch (e) {
      setValue('lpCoin.value', (e as Error).message);
    } finally {
      setValue('isFindingPool', false);
    }
  };

  useEffect(() => {
    handleQuoteRemoveLiquidity();
  }, [value, tokenSelected]);

  useEffect(() => {
    const lpCoin = getValues('lpCoin');

    if (lpCoin && coinsMap) {
      if (
        !coinsMap[lpCoin.type]?.balance ||
        +Number(lpCoin.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[lpCoin.type].balance,
            coinsMap[lpCoin.type].decimals
          ).toFixed(5)
      )
        setValue(
          'error',
          `The ${lpCoin.symbol} amount is superior than your balance, try to reduce`
        );
    }
    setValue('error', null);
  }, [value]);

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
