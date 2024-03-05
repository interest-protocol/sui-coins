import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { withObjectIdGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';
import { PoolPageProps } from '@/interface';
import PoolDetails from '@/views/pool-details';
import { PoolDepositForm, PoolToken } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ objectId }) => {
  const { network } = useNetwork();

  const pool = RECOMMENDED_POOLS[network].find(
    ({ poolObjectId }) => poolObjectId === objectId
  );

  const formDeposit = useForm<PoolDepositForm>({
    defaultValues: {
      tokenList: pool?.tokens.map((token) => ({
        ...token,
        value: '123',
      })) as unknown as Array<PoolToken>,
      lpCoin: '15546',
    },
  });

  return (
    <FormProvider {...formDeposit}>
      <SEO pageTitle="Pool Details" />
      <PoolDetails objectId={objectId} />
    </FormProvider>
  );
};

export default withObjectIdGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
