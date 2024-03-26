import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Send from '@/views/send';
import { ZkSendForm } from '@/views/send/send.types';

const SendPage: NextPage = () => {
  const form = useForm<ZkSendForm>();

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Send " />
      <Send />
    </FormProvider>
  );
};

export default SendPage;
