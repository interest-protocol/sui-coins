import {
  isValidSuiAddress,
  normalizeSuiAddress,
  SUI_TYPE_ARG,
} from '@mysten/sui.js/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COIN_TYPE_TO_COIN } from '@/constants/coins';
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

  const setDefaultToken = async (value: string, field: 'to' | 'from') => {
    if (value === SUI_TYPE_ARG) {
      const { type, symbol, decimals } =
        COIN_TYPE_TO_COIN[network][SUI_TYPE_ARG];

      const usdPrice = await fetch(`/api/v1/coin-price?symbol=${symbol}`)
        .then((response) => response.json())
        .then((data) => data[symbol][0].quote.USD.price)
        .catch(() => null);

      const token: SwapToken = {
        type,
        symbol,
        decimals,
        usdPrice,
        value: '',
        locked: false,
      };

      form.setValue(field, token);

      return type;
    }

    if (
      typeof value === 'string' &&
      isValidSuiAddress(normalizeSuiAddress(value).split('::')[0])
    ) {
      const { type, symbol, decimals } = await getCoin(
        value,
        network,
        coinsMap
      );

      const usdPrice = await fetch(`/api/v1/coin-price?symbol=${symbol}`)
        .then((response) => response.json())
        .then((data) => data[symbol][0].quote.USD.price)
        .catch(() => null);

      const token: SwapToken = {
        type,
        symbol,
        decimals,
        usdPrice,
        value: '',
        locked: false,
      };

      form.setValue(field, token);

      return type;
    }
  };

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(asPath);
      const [fromType, toType] = await Promise.all([
        setDefaultToken(from as string, 'from'),
        setDefaultToken(to as string, 'to'),
      ]);

      searchParams.set('from', fromType ?? '');
      searchParams.set('to', toType ?? '');

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
