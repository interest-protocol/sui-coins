import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COINS_MAP, ETH_TYPE, USDC_TYPE } from '@/constants/coins';
import { ModalProvider } from '@/context/modal';
import { updateURL } from '@/utils/url';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const { query, asPath, pathname } = useRouter();

  const form = useForm<SwapForm>({
    defaultValues: {
      to: {
        value: '',
        ...(COINS_MAP[query.to as keyof typeof COINS_MAP] ??
          COINS_MAP[USDC_TYPE]),
      },
      from: {
        value: '',
        ...(COINS_MAP[query.from as keyof typeof COINS_MAP] ??
          COINS_MAP[ETH_TYPE]),
      },
      settings: {
        slippage: '0.1',
      },
    },
  });

  useEffect(() => {
    if (
      !COINS_MAP[query.to as keyof typeof COINS_MAP] ||
      !COINS_MAP[query.from as keyof typeof COINS_MAP]
    ) {
      const searchParams = new URLSearchParams(asPath);

      if (!COINS_MAP[query.from as keyof typeof COINS_MAP])
        searchParams.set('from', ETH_TYPE);
      if (!COINS_MAP[query.to as keyof typeof COINS_MAP])
        searchParams.set('to', USDC_TYPE);

      updateURL(
        `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
          'to'
        )}`
      );
    }
  }, []);

  return (
    <FormProvider {...form}>
      <ModalProvider>
        <SEO pageTitle="Swap" />
        <Swap />
      </ModalProvider>
    </FormProvider>
  );
};

export default SwapPage;
