import { useSuiClientContext } from '@mysten/dapp-kit';
import {
  isValidSuiAddress,
  normalizeSuiAddress,
  SUI_TYPE_ARG,
} from '@mysten/sui.js/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { SEO } from '@/components';
import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { COIN_TYPE_TO_COIN } from '@/constants/coins';
import { useWeb3 } from '@/hooks/use-web3';
import { getCoin, updateURL } from '@/utils';
import Swap from '@/views/swap';
import { ISwapSettings, SwapForm, SwapToken } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const { coinsMap } = useWeb3();

  const { network } = useSuiClientContext();
  const {
    query: { to, from },
    pathname,
    asPath,
  } = useRouter();

  const settings = useReadLocalStorage<ISwapSettings>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-settings`
  ) ?? { interval: '10', slippage: '0.1' };

  const form = useForm<SwapForm>({
    defaultValues: {
      loading: true,
      aggregator: 'hop',
      settings,
    },
  });

  useEffect(() => {
    form.reset();
    form.setValue('settings', settings);
    updateURL(pathname);
  }, [network]);

  const setDefaultToken = async (
    value: `0x${string}`,
    field: 'to' | 'from'
  ) => {
    if (value === SUI_TYPE_ARG) {
      const { type, symbol, decimals } =
        COIN_TYPE_TO_COIN[network as Network][SUI_TYPE_ARG];

      const token: SwapToken = {
        type,
        symbol,
        decimals,
        display: '',
        usdPrice: null,
      };

      form.setValue(field, token);

      fetch(`/api/auth/v1/coin-price?symbol=${symbol}`)
        .then((response) => response.json())
        .then((data) =>
          form.setValue(`${field}.usdPrice`, data[symbol][0].quote.USD.price)
        )
        .catch(() => null);

      return type;
    }

    if (
      typeof value === 'string' &&
      value.startsWith('0x') &&
      isValidSuiAddress(normalizeSuiAddress(value).split('::')[0])
    ) {
      const { type, symbol, decimals } = await getCoin(
        value,
        network as Network,
        coinsMap
      );

      const token: SwapToken = {
        type,
        symbol,
        decimals,
        display: '',
        usdPrice: null,
      };

      form.setValue(field, token);

      fetch(`/api/auth/v1/coin-price?symbol=${symbol}`)
        .then((response) => response.json?.())
        .then((data) =>
          form.setValue(`${field}.usdPrice`, data[symbol][0].quote.USD.price)
        )
        .catch(console.log);

      return type;
    }
  };

  useEffect(() => {
    form.setValue('settings', settings);
  }, [settings]);

  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(
        asPath.replace('/', '').replace('?', '')
      );

      const [fromType, toType] = await Promise.all([
        setDefaultToken(from as `0x${string}`, 'from'),
        from !== to ? setDefaultToken(to as `0x${string}`, 'to') : undefined,
      ]);

      searchParams.delete('from');
      searchParams.delete('to');

      fromType && searchParams.set('from', fromType);
      toType && searchParams.set('to', toType);

      form.setValue('loading', false);

      const params = searchParams.toString();

      updateURL(`${pathname}${params ? `?${params}` : ''}`);
    })();
  }, []);

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Trade" />
      <Swap />
    </FormProvider>
  );
};

export default SwapPage;
