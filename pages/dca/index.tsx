import { yupResolver } from '@hookform/resolvers/yup';
import { TimeScale } from '@interest-protocol/dca-sdk';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import DCA from '@/views/dca';
import { DCAForm } from '@/views/dca/dca.types';
import { dcaValidationSchema } from '@/views/dca/dca.validation';
import DCAInitManager from '@/views/dca/dca-init-manager';

const DCAPage: NextPage = () => {
  const form = useForm<DCAForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(dcaValidationSchema as any),
    defaultValues: {
      orders: 2,
      price: '',
      intervals: 1,
      starting: false,
      explorerLink: '',
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
