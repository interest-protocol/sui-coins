import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { STRICT_TOKENS, STRICT_TOKENS_TYPE } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';
import { updateURL } from '@/utils';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const { coinsMap } = useWeb3();
  const { network } = useNetwork();
  const { query, pathname, asPath } = useRouter();

  const form = useForm<SwapForm>({
    defaultValues: {
      to: {
        value: '',
        locked: false,
        ...(STRICT_TOKENS[network].find(
          ({ type }) => type === (query.to as string)
        ) ??
          coinsMap[query.to as string] ??
          STRICT_TOKENS_TYPE[network][0]),
      },
      from: {
        value: '',
        locked: false,
        ...(STRICT_TOKENS[network].find(
          ({ type }) => type === (query.from as string)
        ) ??
          coinsMap[query.from as string] ??
          STRICT_TOKENS_TYPE[network][1]),
      },
      settings: {
        deadline: '3',
        slippage: '0.1',
      },
    },
  });

  useEffect(() => {
    if (
      !coinsMap[query.to as string] ||
      !coinsMap[query.from as string] ||
      !STRICT_TOKENS_TYPE[network].includes(query.from as string) ||
      !STRICT_TOKENS_TYPE[network].includes(query.to as string)
    ) {
      const searchParams = new URLSearchParams(asPath);

      if (
        !coinsMap[query.from as string] ||
        !STRICT_TOKENS_TYPE[network].includes(query.from as string)
      )
        searchParams.set('from', STRICT_TOKENS_TYPE[network][0]);
      if (
        !coinsMap[query.to as string] ||
        !STRICT_TOKENS_TYPE[network].includes(query.from as string)
      )
        searchParams.set('to', STRICT_TOKENS_TYPE[network][1]);

      updateURL(
        `${pathname}?from=${searchParams.get('from')}&to=${searchParams.get(
          'to'
        )}`
      );
    }
  }, []);

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Swap" />
      <Swap />
    </FormProvider>
  );
};

export default SwapPage;
