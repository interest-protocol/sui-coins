import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Layout from '@/components/layout';
import Incinerator from '@/views/incinerator';
import {
  IncineratorForm,
  IncineratorTabEnum,
} from '@/views/incinerator/incinerator.types';
import IncineratorInitManager from '@/views/incinerator/incinerator-init-manager';

const IncineratorPage: NextPage = () => {
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
