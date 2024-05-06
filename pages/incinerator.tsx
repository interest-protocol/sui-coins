import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Layout from '@/components/layout';
import { AllObjectsProvider } from '@/context/all-objects';
import Incinerator from '@/views/incinerator';
import {
  IncineratorForm,
  IncineratorTabEnum,
} from '@/views/incinerator/incinerator.types';

const IncineratorPage: NextPage = () => {
  const form = useForm<IncineratorForm>({
    defaultValues: {
      objects: [],
      checked: false,
      tab: IncineratorTabEnum.All,
    },
  });

  return (
    <AllObjectsProvider>
      <FormProvider {...form}>
        <Layout>
          <SEO pageTitle="Incinerator" />
          <Incinerator />
        </Layout>
      </FormProvider>
    </AllObjectsProvider>
  );
};

export default IncineratorPage;
