import { NextPage } from 'next';
import { values } from 'ramda';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COINS } from '@/constants/coins';
import { ModalProvider } from '@/context/modal';
import { useNetwork } from '@/context/network';
import FindPool from '@/views/find-pool';
import { IPoolForm } from '@/views/find-pool/find-pool.types';

const FindPoolPage: NextPage = () => {
  const { network } = useNetwork();
  const form = useForm<IPoolForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      tokenA: {
        value: '0',
        ...values(COINS[network])[0],
      },
      tokenB: {
        value: '0',
        ...values(COINS[network])[1],
      },
    },
  });

  return (
    <FormProvider {...form}>
      <ModalProvider>
        <SEO pageTitle="Find Pool" />
        <FindPool />
      </ModalProvider>
    </FormProvider>
  );
};

export default FindPoolPage;
