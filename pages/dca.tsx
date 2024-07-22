import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import DCA from '@/views/dca';
import { DCAForm, Period } from '@/views/dca/dca.types';

const DCAPage: NextPage = () => {
  const form = useForm<DCAForm>({
    defaultValues: {
      settings: {
        intervals: '1',
        iterations: '2',
        periodicity: Period.Day,
      },
    },
  });

  return (
    <>
      <FormProvider {...form}>
        <SEO pageTitle="DCA" />
        <DCA />
      </FormProvider>
    </>
  );
};

export default DCAPage;
