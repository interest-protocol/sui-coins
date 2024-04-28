import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { SwapForm } from '@/views/swap/swap.types';
import { findSwapPaths } from '@/views/swap/swap-manager/swap-manager.utils';

import SwapManagerField from './swap-manager-field';
import { SwapMessages } from './swap-messages';

const SwapManager: FC = () => {
  const { account } = useWeb3();
  const network = useNetwork();
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

  const swapPaths = findSwapPaths({
    network,
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
        isFetchingSwapAmount={!!isFetchingSwapAmountOut}
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
