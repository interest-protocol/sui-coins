import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { withObjectIdGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { PoolPageProps } from '@/interface';
import PoolDetails from '@/views/pool-details';
import { PoolDetailsProvider } from '@/views/pool-details/pool-details.context';
import { PoolForm } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ objectId }) => {
  const form = useForm<PoolForm>({
    defaultValues: {
      tokenList: [],
      settings: {
        slippage: '0.1',
      },
    },
  });

  return (
    <FormProvider {...form}>
      <PoolDetailsProvider objectId={objectId}>
        <SEO pageTitle="Pool Details" />
        <PoolDetails />
      </PoolDetailsProvider>
    </FormProvider>
  );
};

export default withObjectIdGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
