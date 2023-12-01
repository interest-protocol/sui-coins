import { FC, useState } from 'react';
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks';
import { SwapForm } from '@/views/swap/swap.types';
import { findSwapPaths } from '@/views/swap/swap-manager/swap-manager.utils';

import SwapManagerField from './swap-manager-field';
import { SwapMessages } from './swap-messages';

const SwapManager: FC = () => {
  const formSwap: UseFormReturn<SwapForm> = useFormContext();
  const { account } = useWeb3();

  const [error, setError] = useState(false);
  const [isZeroSwapAmountIn, setIsZeroSwapAmountIn] = useState(false);
  const [isZeroSwapAmountOut, setIsZeroSwapAmountOut] = useState(false);
  const [isFetchingSwapAmountIn, setIsFetchingSwapAmountIn] = useState(false);
  const [isFetchingSwapAmountOut, setIsFetchingSwapAmountOut] = useState(false);

  const coinInType = useWatch({
    control: formSwap.control,
    name: 'from.type',
  });

  const coinOutType = useWatch({
    control: formSwap.control,
    name: 'to.type',
  });

  const swapPaths = findSwapPaths({
    coinInType,
    coinOutType,
  });

  const hasNoMarket = !swapPaths.length;

  return (
    <>
      <SwapManagerField
        name="from"
        setValueName="to"
        account={account}
        setError={setError}
        type={coinOutType}
        swapPaths={swapPaths}
        hasNoMarket={hasNoMarket}
        control={formSwap.control}
        setValue={formSwap.setValue}
        setIsZeroSwapAmount={setIsZeroSwapAmountOut}
        isFetchingSwapAmount={isFetchingSwapAmountOut}
        setIsFetchingSwapAmount={setIsFetchingSwapAmountOut}
      />
      <SwapManagerField
        name="to"
        setValueName="from"
        account={account}
        type={coinInType}
        setError={setError}
        swapPaths={swapPaths}
        hasNoMarket={hasNoMarket}
        control={formSwap.control}
        setValue={formSwap.setValue}
        setIsZeroSwapAmount={setIsZeroSwapAmountIn}
        isFetchingSwapAmount={isFetchingSwapAmountIn}
        setIsFetchingSwapAmount={setIsFetchingSwapAmountIn}
      />
      <SwapMessages
        error={error}
        hasNoMarket={hasNoMarket}
        control={formSwap.control}
        setError={formSwap.setError}
        errors={formSwap.formState.errors}
        isZeroSwapAmountIn={isZeroSwapAmountIn}
        isZeroSwapAmountOut={isZeroSwapAmountOut}
        isFetchingSwapAmountIn={isFetchingSwapAmountIn}
        isFetchingSwapAmountOut={isFetchingSwapAmountOut}
      />
    </>
  );
};

export default SwapManager;
