import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { withObjectIdGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { PoolPageProps } from '@/interface';
import PoolDetails from '@/views/pool-details';
import { PoolDetailsProvider } from '@/views/pool-details/pool-details.context';
import { PoolForm, PoolOption } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ objectId }) => {
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  const handleOptionTab = (index: PoolOption) => setPoolOptionView(index);

  const form = useForm<PoolForm>({
    defaultValues: {
      tokenList: [],
      settings: {
        slippage: '0.1',
      },
    },
  });

  useEffect(() => {
    form.resetField('lpCoin.value');
    form.resetField('tokenList.0.value');
    form.resetField('tokenList.1.value');
  }, [poolOptionView]);

  return (
    <FormProvider {...form}>
      <PoolDetailsProvider objectId={objectId}>
        <SEO pageTitle="Pool Details" />
        <PoolDetails
          poolOptionView={poolOptionView}
          handleOptionTab={handleOptionTab}
        />
      </PoolDetailsProvider>
    </FormProvider>
  );
};

export default withObjectIdGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
