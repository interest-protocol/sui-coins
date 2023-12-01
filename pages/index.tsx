import { NextPage } from 'next';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COIN_METADATA, ETH_TYPE, USDC_TYPE } from '@/constants/coins';
import { useWeb3 } from '@/hooks';
import { FixedPointMath, TOKEN_SYMBOL } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const { coinsMap } = useWeb3();

  const form = useForm<SwapForm>({
    defaultValues: {
      to: {
        balance: 0,
        value: '0.0',
        type: USDC_TYPE,
        symbol: TOKEN_SYMBOL.USDC,
        decimals: COIN_METADATA[USDC_TYPE].decimals,
      },
      from: {
        balance: 0,
        value: '0.0',
        type: ETH_TYPE,
        symbol: TOKEN_SYMBOL.ETH,
        decimals: COIN_METADATA[ETH_TYPE].decimals,
      },
      settings: {
        deadline: '3',
        slippage: '0.1',
        speed: 'instant',
      },
    },
  });

  useEffect(() => {
    form.setValue('from', {
      balance: FixedPointMath.toNumber(
        coinsMap[USDC_TYPE]?.totalBalance ?? ZERO_BIG_NUMBER
      ),
      value: '0.0',
      type: USDC_TYPE,
      symbol: TOKEN_SYMBOL.USDC,
      decimals: COIN_METADATA[USDC_TYPE].decimals,
      locked: false,
    });
    form.setValue('to', {
      balance: FixedPointMath.toNumber(
        coinsMap[ETH_TYPE]?.totalBalance ?? ZERO_BIG_NUMBER
      ),
      value: '0.0',
      type: ETH_TYPE,
      symbol: TOKEN_SYMBOL.ETH,
      decimals: COIN_METADATA[ETH_TYPE].decimals,
      locked: false,
    });
  }, []);

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Swap" />
      <Swap />
    </FormProvider>
  );
};

export default SwapPage;
