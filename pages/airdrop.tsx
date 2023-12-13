import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COINS } from '@/constants';
import Airdrop from '@/views/airdrop';
import { IAirdropForm } from '@/views/airdrop/airdrop.types';

const AirdropPage: NextPage = () => {
  const form = useForm<IAirdropForm>({
    defaultValues: {
      token: {
        ...COINS[0],
        value: '0',
      },
      file: null,
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Airdrop" />
      <Airdrop />
    </FormProvider>
  );
};

export default AirdropPage;
