import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { values } from 'ramda';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COIN_TYPE, COIN_TYPE_TO_COIN } from '@/constants/coins';
import { ModalProvider } from '@/context/modal';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { updateURL, ZERO_BIG_NUMBER } from '@/utils';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const { coinsMap } = useWeb3();
  const { network } = useNetwork();
  const { query, asPath, pathname } = useRouter();

  const form = useForm<SwapForm>({
    defaultValues: {
      to: {
        value: '',
        locked: false,
        ...(COIN_TYPE_TO_COIN[network][query.to as string] ??
          COIN_TYPE_TO_COIN[network][values(COIN_TYPE[network])[0]]),
      },
      from: {
        value: '',
        locked: false,
        ...(COIN_TYPE_TO_COIN[network][query.from as string] ??
          COIN_TYPE_TO_COIN[network][values(COIN_TYPE[network])[1]]),
      },
      settings: {
        deadline: '3',
        slippage: '0.1',
      },
    },
  });

  useEffect(() => {
    if (!coinsMap[query.to as string] || !coinsMap[query.from as string]) {
      const searchParams = new URLSearchParams(asPath);

      if (!coinsMap[query.from as string])
        searchParams.set('from', values(COIN_TYPE[network])[0]);

      if (!coinsMap[query.to as string])
        searchParams.set('to', values(COIN_TYPE[network])[1]);

      updateURL(
        `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
          'to'
        )}`
      );
    }
  }, []);

  useEffect(() => {
    form.setValue(
      'from.balance',
      FixedPointMath.toNumber(
        coinsMap[form.getValues('from.type')]?.totalBalance ?? ZERO_BIG_NUMBER
      )
    );
    form.setValue(
      'to.balance',
      FixedPointMath.toNumber(
        coinsMap[form.getValues('to.type')]?.totalBalance ?? ZERO_BIG_NUMBER
      )
    );
  }, [coinsMap]);

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
