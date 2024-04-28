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
import { LOCAL_STORAGE_VERSION } from '@/constants';
import { COINS_MAP } from '@/constants/coins';
import { ModalProvider } from '@/context/modal';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { getCoin } from '@/utils';
import { updateURL } from '@/utils/url';
import Swap from '@/views/swap';
import { ISwapSettings, SwapForm, SwapToken } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const {
    query: { to, from },
    pathname,
    asPath,
  } = useRouter();

  const settings = useReadLocalStorage<ISwapSettings>(
    `${LOCAL_STORAGE_VERSION}-movement-coins-settings`
  ) ?? { interval: '10', slippage: '0.1' };

  const form = useForm<SwapForm>({
    defaultValues: {
      loading: true,
      settings,
    },
  });

  const setDefaultToken = async (
    value: `0x${string}`,
    field: 'to' | 'from'
  ) => {
    if (value === SUI_TYPE_ARG) {
      const { type, symbol, decimals } = COINS_MAP[SUI_TYPE_ARG];

      const token: SwapToken = {
        type,
        symbol,
        decimals,
        value: '',
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
        network,
        coinsMap
      );

      const token: SwapToken = {
        type,
        symbol,
        decimals,
        value: '',
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
      <ModalProvider>
        <SEO pageTitle="Swap" />
        <Swap />
      </ModalProvider>
    </FormProvider>
  );
};

export default SwapPage;
