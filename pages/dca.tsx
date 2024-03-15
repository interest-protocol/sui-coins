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
import DCA from '@/views/dca';
import { DCAForm, DCAToken } from '@/views/dca/dca.types';

const DCAPage: NextPage = () => {
  const { coinsMap } = useWeb3();
  const network = useNetwork();
  const {
    query: { to, from },
    pathname,
    asPath,
  } = useRouter();

  const form = useForm<DCAForm>({
    defaultValues: {
      loading: true,
      settings: {
        intervals: '1',
        iterations: '2',
        periodicity: 'day',
      },
    },
  });

  const setDefaultToken = async (
    value: `0x${string}`,
    field: 'to' | 'from'
  ) => {
    if (value === SUI_TYPE_ARG) {
      const { type, symbol, decimals } =
        COIN_TYPE_TO_COIN[network][SUI_TYPE_ARG];

      const usdPrice = await fetch(`/api/v1/coin-price?symbol=${symbol}`)
        .then((response) => response.json())
        .then((data) => data[symbol][0].quote.USD.price)
        .catch(() => null);

      const token: DCAToken = {
        type,
        symbol,
        decimals,
        usdPrice,
        value: '',
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
        .then((response) => response.json?.())
        .then((data) => data[symbol][0].quote.USD.price)
        .catch(console.log);

      const token: DCAToken = {
        type,
        symbol,
        decimals,
        usdPrice,
        value: '',
      };

      form.setValue(field, token);

      return type;
    }
  };

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(asPath);
      const [fromType, toType] = await Promise.all([
        setDefaultToken(from as `0x${string}`, 'from'),
        setDefaultToken(to as `0x${string}`, 'to'),
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
    <>
      <FormProvider {...form}>
        <SEO pageTitle="DCA" />
        <DCA />
      </FormProvider>
    </>
  );
};

export default DCAPage;
