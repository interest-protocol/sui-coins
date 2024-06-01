import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { findRoutes } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';
import { useGetDex } from '@/views/swap/swap-manager/swap-manager.hooks';

import SwapManagerField from './swap-manager-field';
import { SwapMessages } from './swap-messages';

const SwapManager: FC = () => {
  const account = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();

  const [error, setError] = useState(false);
  const [isZeroSwapAmountIn, setIsZeroSwapAmountIn] = useState(false);
  const [isZeroSwapAmountOut, setIsZeroSwapAmountOut] = useState(false);

  const isFetchingSwapAmountIn = useWatch({
    control: formSwap.control,
    name: 'from.isFetchingSwap',
  });

  const isFetchingSwapAmountOut = useWatch({
    control: formSwap.control,
    name: 'to.isFetchingSwap',
  });

  const setIsFetchingSwapAmountOut = (value: boolean) => {
    formSwap.setValue('to.isFetchingSwap', value);
  };

  const setIsFetchingSwapAmountIn = (value: boolean) => {
    formSwap.setValue('from.isFetchingSwap', value);
  };

  const coinInType = useWatch({
    control: formSwap.control,
    name: 'from.type',
  });

  const coinOutType = useWatch({
    control: formSwap.control,
    name: 'to.type',
  });

  const {
    data,
    isLoading,
    error: dexError,
  } = useGetDex({ coinInType, coinOutType });

  useEffect(() => {
    formSwap.setValue(
      'error',
      !isLoading && !data && coinInType && coinOutType && dexError
        ? 'Error fetching the pools'
        : undefined
    );
  }, [dexError]);

  if (isLoading || !data) return null;

  const routes = findRoutes(data.dex, coinInType, coinOutType);

  const hasNoMarket = !routes.length;

  return (
    <>
      <SwapManagerField
        name="from"
        routes={routes}
        setValueName="to"
        type={coinOutType}
        setError={setError}
        poolsMap={data.poolsMap}
        hasNoMarket={hasNoMarket}
        account={account!.address}
        control={formSwap.control}
        setValue={formSwap.setValue}
        setIsZeroSwapAmount={setIsZeroSwapAmountOut}
        isFetchingSwapAmount={!!isFetchingSwapAmountOut}
        setIsFetchingSwapAmount={setIsFetchingSwapAmountOut}
      />
      <SwapManagerField
        name="to"
        routes={routes}
        type={coinInType}
        setValueName="from"
        setError={setError}
        poolsMap={data.poolsMap}
        hasNoMarket={hasNoMarket}
        control={formSwap.control}
        account={account!.address}
        setValue={formSwap.setValue}
        setIsZeroSwapAmount={setIsZeroSwapAmountIn}
        isFetchingSwapAmount={!!isFetchingSwapAmountIn}
        setIsFetchingSwapAmount={setIsFetchingSwapAmountIn}
      />
      <SwapMessages
        error={error}
        hasNoMarket={hasNoMarket}
        control={formSwap.control}
        isZeroSwapAmountIn={isZeroSwapAmountIn}
        isZeroSwapAmountOut={isZeroSwapAmountOut}
        isFetchingSwapAmountIn={!!isFetchingSwapAmountIn}
        isFetchingSwapAmountOut={!!isFetchingSwapAmountOut}
      />
    </>
  );
};

export default SwapManager;
