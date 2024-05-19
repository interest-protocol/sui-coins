import { useSuiClient } from '@mysten/dapp-kit';
import { BigNumber } from 'bignumber.js';
import { prop } from 'ramda';
import { FC, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

import { useNetwork } from '@/context/network';
import { FixedPointMath } from '@/lib';
import { makeSWRKey } from '@/utils';

import { RouteWithAmount, SwapManagerProps } from './swap-manager.types';
import { findAmount } from './swap-manager.utils';

const SwapManagerField: FC<SwapManagerProps> = ({
  type,
  poolsMap,
  name,
  control,
  account,
  setError,
  setValue,
  routes,
  hasNoMarket,
  setIsZeroSwapAmount,
  isFetchingSwapAmount,
  setIsFetchingSwapAmount,
  setValueName,
}) => {
  const network = useNetwork();
  const client = useSuiClient();
  const [from] = useDebounce(useWatch({ control, name }), 900);

  const lock = useWatch({ control, name: 'lock' });
  const decimals = useWatch({ control, name: `${setValueName}.decimals` });

  const { error } = useSWR(
    makeSWRKey(
      [account, type, prop('value', from), prop('type', from)],
      SwapManagerField.name
    ),
    async () => {
      const amount = FixedPointMath.toBigNumber(from.value, from.decimals);

      const safeAmount = amount.decimalPlaces(0, BigNumber.ROUND_DOWN);

      if (!from || !+from.value || lock || hasNoMarket) return;

      setIsFetchingSwapAmount(true);

      const routesWithAmounts = await findAmount({
        client,
        routes,
        amount: safeAmount.toString(),
        isAmountIn: name === 'to',
        network,
        poolsMap,
      });

      return routesWithAmounts.reduce(
        (acc, routeWithAmount) => {
          const [coinsPath, poolIds, amountObj] = routeWithAmount;

          if (acc[2].amount.gt(amountObj.amount)) return acc;

          return [coinsPath, poolIds, amountObj];
        },
        [[], [], { isAmountIn: false, amount: BigNumber(0) }] as RouteWithAmount
      );
    },
    {
      onError: () => {
        setError(false);
        setIsFetchingSwapAmount(false);
        setValue('lock', true);
        setValue('routeWithAmount', []);
      },
      onSuccess: (response) => {
        if (!response) {
          setError(false);
          setIsFetchingSwapAmount(false);
          setValue('lock', true);
          return;
        }

        const [coinsPath, poolIds, amountObj] = response;

        setIsZeroSwapAmount(amountObj.amount.isZero());
        setValue(
          `${setValueName}.value`,
          FixedPointMath.toNumber(
            amountObj.amount,
            decimals,
            decimals
          ).toString()
        );
        setValue('poolsMap', poolsMap);
        setValue('routeWithAmount', [coinsPath, poolIds, amountObj]);

        setError(false);
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
      (error && +from?.value > 0) ||
        isFetchingSwapAmount ||
        from?.type === type ||
        hasNoMarket
    );
  }, [error, from, hasNoMarket, from?.type, type, isFetchingSwapAmount]);

  return null;
};

export default SwapManagerField;
