import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { values } from 'ramda';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COIN_TYPE, COIN_TYPE_TO_COIN } from '@/constants/coins';
import { ModalProvider } from '@/context/modal';
import { useNetwork } from '@/context/network';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPage: NextPage = () => {
  const { network } = useNetwork();
  const { query } = useRouter();

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

  return (
    <ModalProvider>
      <FormProvider {...form}>
        <SEO pageTitle="Swap" />
        <Swap />
      </FormProvider>
    </ModalProvider>
  );
};

export default SwapPage;
