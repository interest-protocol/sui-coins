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
import IncineratorInitManager from '@/views/incinerator/incinerator-init-manager';

const IncineratorPage: NextPage = () => {
  const { currentWallet } = useCurrentWallet();
  const { push } = useRouter();

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

  return (
    <FormProvider {...form}>
      <Layout>
        <SEO pageTitle="Incinerator" />
        <Incinerator />
        <IncineratorInitManager />
      </Layout>
    </FormProvider>
  );
};

export default IncineratorPage;
