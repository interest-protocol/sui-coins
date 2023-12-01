import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COINS_MAP, ETH_TYPE, USDC_TYPE } from '@/constants/coins';
import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import { updateURL } from '@/utils/url';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const { coinsMap } = useWeb3();
  const { query, asPath, pathname } = useRouter();

  const form = useForm<SwapForm>({
    defaultValues: {
      to: {
        balance: 0,
        value: '',
        locked: false,
        ...(COINS_MAP[query.to as string] ?? COINS_MAP[USDC_TYPE]),
      },
      from: {
        balance: 0,
        value: '',
        locked: false,
        ...(COINS_MAP[query.from as string] ?? COINS_MAP[ETH_TYPE]),
      },
      settings: {
        deadline: '3',
        slippage: '0.1',
        speed: 'instant',
      },
    },
  });

  useEffect(() => {
    if (!COINS_MAP[query.to as string] || !COINS_MAP[query.from as string]) {
      const searchParams = new URLSearchParams(asPath);

      if (!COINS_MAP[query.from as string]) searchParams.set('from', ETH_TYPE);
      if (!COINS_MAP[query.to as string]) searchParams.set('to', USDC_TYPE);

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
      <SEO pageTitle="Swap" />
      <Swap />
    </FormProvider>
  );
};

export default SwapPage;
