import BigNumber from 'bignumber.js';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COINS } from '@/constants';
import { FixedPointMath } from '@/lib';
import Airdrop from '@/views/airdrop';
import { IAirdropForm } from '@/views/airdrop/airdrop.types';
import { useGetAllCoinsWithMetadata } from '@/views/my-coins/my-coins.hooks';

const AirdropPage: NextPage = () => {
  const form = useForm<IAirdropForm>({
    defaultValues: {
      token: {
        ...COINS[0],
        balance: 0,
      },
      airdropList: null,
    },
  });

  const { coins } = useGetAllCoinsWithMetadata();

  useEffect(() => {
    form.setValue(
      'token.balance',
      FixedPointMath.toNumber(
        BigNumber(
          coins.find(
            ({ coinType }) => coinType === form.getValues('token.type')
          )?.balance ?? '0'
        ),
        form.getValues('token.decimals')
      )
    );
  }, [coins]);

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Airdrop" />
      <Airdrop />
    </FormProvider>
  );
};

export default AirdropPage;
