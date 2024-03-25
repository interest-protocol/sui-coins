import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import ZkSend from '@/views/zksend';
import { ZkSendForm } from '@/views/zksend/zksend.types';

const ZkSendPage: NextPage = () => {
  const form = useForm<ZkSendForm>();

  return (
    <FormProvider {...form}>
      <SEO pageTitle="ZkSend " />
      <ZkSend />
    </FormProvider>
  );
};

export default ZkSendPage;
