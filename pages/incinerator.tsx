import { useCurrentWallet } from '@mysten/dapp-kit';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Layout from '@/components/layout';
import { INCINERATOR_EXTERNAL_LINK } from '@/constants';
import Incinerator from '@/views/incinerator';
import {
  IncineratorForm,
  IncineratorTabEnum,
} from '@/views/incinerator/incinerator.types';

const IncineratorPage: NextPage = () => {
  const { currentWallet } = useCurrentWallet();
  const { replace } = useRouter();

  const form = useForm<IncineratorForm>({
    defaultValues: {
      search: '',
      objects: [],
      empty: true,
      reset: false,
      checked: false,
      tab: IncineratorTabEnum.All,
    },
  });

  useEffect(() => {
    if (currentWallet?.name === 'Sui Wallet') {
      console.log('>> Redirecting to Sui Wallet safe website');
      replace(INCINERATOR_EXTERNAL_LINK);
    }
  }, [currentWallet]);

  return (
    <FormProvider {...form}>
      <Layout>
        <SEO pageTitle="Incinerator" />
        <Incinerator />
      </Layout>
    </FormProvider>
  );
};

export default IncineratorPage;
