import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useNetwork } from '@/context/network';

import { SendFormsProps } from '../send-forms.types';
import { ISendBulkForm } from './send-bulk.types';
import SendBulkForm from './send-bulk-form';

const SendBulk: FC<SendFormsProps> = ({ goBack }) => {
  const network = useNetwork();
  const form = useForm<ISendBulkForm>();
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    form.reset();
  }, [network, currentAccount]);

  return (
    <FormProvider {...form}>
      <SendBulkForm goBack={goBack} />
    </FormProvider>
  );
};

export default SendBulk;
