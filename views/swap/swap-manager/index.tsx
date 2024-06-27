import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DEAD_ADDRESS } from '@/constants';
import { findRoutes } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';
import { useGetDex } from '@/views/swap/swap-manager/swap-manager.hooks';

import SwapManagerField from './swap-manager-field';
import { SwapMessages } from './swap-messages';

const SwapManager: FC = () => {
  const account = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();

  const [error, setError] = useState(false);
  const [isZeroSwapAmount, setIsZeroSwapAmount] = useState(false);

  const isFetchingSwapAmount = useWatch({
    control: formSwap.control,
    name: 'to.isFetchingSwap',
  });

  const setIsFetchingSwapAmount = (value: boolean) => {
    formSwap.setValue('to.isFetchingSwap', value);
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
        control={formSwap.control}
        setValue={formSwap.setValue}
        setIsZeroSwapAmount={setIsZeroSwapAmount}
        account={account?.address || DEAD_ADDRESS}
        isFetchingSwapAmount={!!isFetchingSwapAmount}
        setIsFetchingSwapAmount={setIsFetchingSwapAmount}
      />
      <SwapMessages
        error={error}
        hasNoMarket={hasNoMarket}
        control={formSwap.control}
        isZeroSwapAmount={isZeroSwapAmount}
        isFetchingSwapAmount={!!isFetchingSwapAmount}
      />
    </>
  );
};

export default SwapManager;
