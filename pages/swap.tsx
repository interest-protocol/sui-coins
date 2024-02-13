import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';
import { getCoin, updateURL } from '@/utils';
import Swap from '@/views/swap';
import { SwapForm, SwapToken } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const { coinsMap } = useWeb3();
  const { network } = useNetwork();
  const {
    query: { to, from },
    pathname,
    asPath,
  } = useRouter();

  const form = useForm<SwapForm>({
    defaultValues: {
      loading: true,
      settings: {
        deadline: '3',
        slippage: '0.1',
      },
    },
  });

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(asPath);

      if (
        typeof to === 'string' &&
        isValidSuiAddress((to as string).split('::')[0])
      ) {
        const { type, symbol, decimals } = await getCoin(to, network, coinsMap);

        console.log({ type, symbol, decimals });

        searchParams.set('to', type);

        const usdPrice = await fetch(`/api/v1/coin-price?symbol=${symbol}`)
          .then((res) => res.json())
          .catch(() => null);

        const token: SwapToken = {
          type,
          symbol,
          decimals,
          usdPrice,
          value: '',
          locked: false,
        };

        form.setValue('to', token);
      }

      if (
        typeof from === 'string' &&
        isValidSuiAddress((from as string).split('::')[0])
      ) {
        const { type, symbol, decimals } = await getCoin(
          from,
          network,
          coinsMap
        );

        searchParams.set('from', type);

        const usdPrice = await fetch(`/api/v1/coin-price?symbol=${symbol}`)
          .then((res) => res.json())
          .catch(() => null);

        const token: SwapToken = {
          type,
          symbol,
          decimals,
          usdPrice,
          value: '',
          locked: false,
        };

        form.setValue('from', token);
      }

      form.setValue('loading', false);

      updateURL(
        `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
          'to'
        )}`
      );
    })();
  }, []);

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Swap" />
      <Swap />
    </FormProvider>
  );
};

export default SwapPage;
