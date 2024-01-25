import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { ModalProvider } from '@/context/modal';
import Airdrop from '@/views/airdrop';
import { IAirdropForm } from '@/views/airdrop/airdrop.types';

const AirdropPage: NextPage = () => {
  const form = useForm<IAirdropForm>({
    defaultValues: {
      done: [],
      failed: [],
    },
  });

  return (
    <ModalProvider>
      <FormProvider {...form}>
        <SEO pageTitle="Airdrop" />
        <Airdrop />
      </FormProvider>
    </ModalProvider>
  );
};

export default AirdropPage;
