import { TimeScale } from '@interest-protocol/dca-sdk';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import DCA from '@/views/dca';
import { DCAForm } from '@/views/dca/dca.types';
import DCAInitManager from '@/views/dca/dca-init-manager';

const DCAPage: NextPage = () => {
  const form = useForm<DCAForm>({
    defaultValues: {
      intervals: 1,
      orders: 2,
      periodicity: TimeScale.Minutes,
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="DCA" />
      <DCAInitManager />
      <DCA />
    </FormProvider>
  );
};

export default DCAPage;
