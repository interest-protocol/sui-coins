import { NextPage } from 'next';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { withObjectIdGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';
import { PoolPageProps } from '@/interface';
import { ZERO_BIG_NUMBER } from '@/utils';
import PoolDetails from '@/views/pool-details';
import { PoolForm, PoolOption, PoolToken } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ objectId }) => {
  const { network } = useNetwork();
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  const handleOptionTab = (index: PoolOption) => {
    setPoolOptionView(index);
  };

  const pool = RECOMMENDED_POOLS[network].find(
    ({ poolObjectId }) => poolObjectId === objectId
  );

  const formDeposit = useForm<PoolForm>({
    defaultValues: {
      tokenList: pool?.tokens.map((token) => ({
        ...token,
        value: '123',
      })) as unknown as Array<PoolToken>,
      lpCoin: '15546',
      settings: {
        deadline: '3',
        slippage: '0.1',
        speed: 'instant',
      },
    },
  });

  const formWithdraw = useForm<PoolForm>({
    defaultValues: {
      tokenList: pool?.tokens.map((token) => ({
        ...token,
        value: '123',
        balance: '40596',
      })) as unknown as Array<PoolToken>,
      lpCoin: {
        symbol: 'LP token',
        decimals: 9,
        type: `${ZERO_BIG_NUMBER}`,
        balance: 1000,
        value: '500',
      },
      settings: {
        deadline: '3',
        slippage: '0.1',
        speed: 'instant',
      },
    },
  });

  return (
    <FormProvider
      {...(poolOptionView === PoolOption.Deposit ? formDeposit : formWithdraw)}
    >
      <SEO pageTitle="Pool Details" />
      <PoolDetails
        objectId={objectId}
        poolOptionView={poolOptionView}
        handleOptionTab={handleOptionTab}
      />
    </FormProvider>
  );
};

export default withObjectIdGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
