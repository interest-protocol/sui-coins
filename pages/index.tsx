import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Swap from '@/views/swap';
import { Aggregator, SwapForm } from '@/views/swap/swap.types';
import SwapInitManager from '@/views/swap/swap-init-manager';

const SwapPage: NextPage = () => {
  const form = useForm<SwapForm>({
    defaultValues: {
      focus: true,
      loading: true,
      settings: { slippage: '2', aggregator: Aggregator.Interest },
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Trade" />
      <SwapInitManager />
      <Swap />
    </FormProvider>
  );
};

export default SwapPage;
