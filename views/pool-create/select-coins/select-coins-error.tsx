import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import pool from '@/components/svg/pool';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import { isSui } from '@/utils';

import { CreatePoolForm } from '../pool-create.types';

const SelectCoinsError: FC = () => {
  const { coinsMap } = useWeb3();
  const [error, setError] = useState('');
  const { control } = useFormContext<CreatePoolForm>();

  const tokenList = useWatch({ control, name: 'tokens' });

  useEffect(() => {
    if (tokenList.length && coinsMap) {
      const coin1 = tokenList[0];
      const coin2 = tokenList[1];

      if (
        !tokenList?.length ||
        !coinsMap ||
        !pool ||
        !coinsMap[coin1.type]?.balance ||
        !coinsMap[coin2.type]?.balance
      )
        return;

      if (isSui(coin1.type)) {
        if (
          +Number(coin1.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[coin1.type].balance,
            coinsMap[coin1.type].decimals
          ).toFixed(5)
        ) {
          setError(
            `The ${coin1.symbol} amount is superior than your balance, try to reduce`
          );
          return;
        }

        if (
          +Number(coin1.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[coin1.type].balance.minus(100_000_000),
            coinsMap[coin1.type].decimals
          ).toFixed(5)
        ) {
          setError(
            `The ${coin1.symbol} amount is superior than safe balance, try to leave at least 0.1 MOVE`
          );
          return;
        }
      }

      if (
        +Number(coin1.value).toFixed(5) >
        +FixedPointMath.toNumber(
          coinsMap[coin1.type].balance,
          coinsMap[coin1.type].decimals
        ).toFixed(5)
      ) {
        setError(
          `The ${coin1.symbol} amount is superior than your balance, try to reduce`
        );
        return;
      }

      if (isSui(coin2.type)) {
        if (
          +Number(coin2.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[coin2.type].balance,
            coinsMap[coin2.type].decimals
          ).toFixed(5)
        ) {
          setError(
            `The ${coin2.symbol} amount is superior than your balance, try to reduce`
          );
          return;
        }

        if (
          +Number(coin2.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[coin2.type].balance.minus(100_000_000),
            coinsMap[coin2.type].decimals
          ).toFixed(5)
        ) {
          setError(
            `The ${coin2.symbol} amount is superior than safe balance, try to leave at least 0.1 MOVE`
          );
          return;
        }
      }

      if (
        +Number(coin2.value).toFixed(5) >
        +FixedPointMath.toNumber(
          coinsMap[coin2.type].balance,
          coinsMap[coin2.type].decimals
        ).toFixed(5)
      ) {
        setError(
          `The ${coin2.symbol} amount is superior than your balance, try to reduce`
        );
        return;
      }
    }
    setError('');
  }, [tokenList]);

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

export default SelectCoinsError;
