import { BigNumber } from 'bignumber.js';
import { prop } from 'ramda';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';
import { FixedPointMath } from '@/lib';
import { makeSWRKey } from '@/utils';
import {
  quoteAmountIn,
  quoteAmountOut,
} from '@/views/swap/swap-manager/swap-manager.utils';

import { SwapManagerProps } from './swap-manager.types';

const SwapManagerField: FC<SwapManagerProps> = ({
  type,
  name,
  control,
  account,
  setError,
  setValue,
  swapPaths,
  hasNoMarket,
  setIsZeroSwapAmount,
  isFetchingSwapAmount,
  setIsFetchingSwapAmount,
  setValueName,
}) => {
  const { network } = useNetwork();
  const client = useSuiClient(network);
  const [tokenIn] = useDebounce(useWatch({ control, name }), 900);

  const lock = useWatch({ control, name: 'lock' });
  const decimals = useWatch({ control, name: 'to.decimals' });

  const { error } = useSWR(
    makeSWRKey(
      [account, type, prop('value', tokenIn), prop('type', tokenIn)],
      client.devInspectTransactionBlock.name
    ),
    async () => {
      setValue(`${name}.locked`, true);

      const amount = FixedPointMath.toBigNumber(
        tokenIn.value,
        tokenIn.decimals
      );

      const safeAmount = amount.decimalPlaces(0, BigNumber.ROUND_DOWN);

      if (!tokenIn || !+tokenIn.value || lock || hasNoMarket) return;

      setIsFetchingSwapAmount(true);

      const promises = swapPaths.map((swapPath) =>
        (setValueName === 'to' ? quoteAmountOut : quoteAmountIn)({
          client,
          network,
          swapPath,
          amount: safeAmount.toString(),
        })
      );

      const amounts = await Promise.all(promises);

      return amounts.reduce(
        (acc, amount, index) => {
          const accAmount = BigNumber(acc.amount);
          const nextAmount = BigNumber(amount);

          if (accAmount.gte(nextAmount)) return acc;

          return {
            amount,
            swapPathIndex: index,
          };
        },
        { amount: '0', swapPathIndex: 0 }
      );
    },
    {
      onError: () => {
        setError(false);
        setIsFetchingSwapAmount(false);
        setValue(`${name}.locked`, false);
        setValue('lock', true);
        setValue('swapPath', []);
      },
      onSuccess: (response) => {
        if (!response) {
          setError(false);
          setIsFetchingSwapAmount(false);
          setValue(`${name}.locked`, false);
          setValue('lock', true);
          return;
        }

        setIsZeroSwapAmount(!response.amount);
        setValue(
          `${setValueName}.value`,
          FixedPointMath.toNumber(
            new BigNumber(response.amount),
            decimals,
            decimals
          ).toString()
        );
        setValue('swapPath', swapPaths[response.swapPathIndex]);

        setError(false);
        setValue(`${name}.locked`, false);
        setIsFetchingSwapAmount(false);
        setValue('lock', true);
      },
      revalidateOnFocus: true,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );

  useEffect(() => {
    setValue(
      'disabled',
      !!(error && +tokenIn?.value > 0) ||
        isFetchingSwapAmount ||
        tokenIn?.type === type ||
        hasNoMarket
    );
  }, [error, tokenIn, hasNoMarket, tokenIn?.type, type, isFetchingSwapAmount]);

  return null;
};

export default SwapManagerField;
