import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks';
import { findRoutes } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';
import { useGetDex } from '@/views/swap/swap-manager/swap-manager.hooks';

import SwapManagerField from './swap-manager-field';
import { SwapMessages } from './swap-messages';

const SwapManager: FC = () => {
  const formSwap = useFormContext<SwapForm>();
  const { account } = useWeb3();

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

  // TODO
  if (!isLoading && dexError && !data)
    return <div>Error fetching the pools</div>;

  if (isLoading || !data) return null;

  const routes = findRoutes(data.dex, coinInType, coinOutType);

  const hasNoMarket = !routes.length;

  return (
    <>
      <SwapManagerField
        poolsMap={data.poolsMap}
        name="from"
        setValueName="to"
        account={account}
        setError={setError}
        routes={routes}
        type={coinOutType}
        hasNoMarket={hasNoMarket}
        control={formSwap.control}
        setValue={formSwap.setValue}
        setIsZeroSwapAmount={setIsZeroSwapAmountOut}
        isFetchingSwapAmount={!!isFetchingSwapAmountOut}
        setIsFetchingSwapAmount={setIsFetchingSwapAmountOut}
      />
      <SwapManagerField
        poolsMap={data.poolsMap}
        name="to"
        setValueName="from"
        account={account}
        type={coinInType}
        routes={routes}
        setError={setError}
        hasNoMarket={hasNoMarket}
        control={formSwap.control}
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
