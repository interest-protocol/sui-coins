import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { withObjectIdGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { PoolPageProps } from '@/interface';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import PoolDetails from '@/views/pool-details';
import { PoolForm, PoolOption } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ objectId }) => {
  const { coinsMap } = useWeb3();
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

  const form = useForm<PoolForm>({
    defaultValues: {
      tokenList: pool?.tokens.map((token) => ({
        ...token,
        value: '0',
      })),
      lpCoin: {
        symbol: 'LP token',
        decimals: 9,
        type: `${ZERO_BIG_NUMBER}`,
        value: '0',
      },
      settings: {
        deadline: '3',
        slippage: '0.1',
        speed: 'instant',
      },
    },
  });

  useEffect(() => {
    const tokenList = form.getValues('tokenList');
    const lpCoinType = form.getValues('lpCoin.type');

    form.setValue(
      'tokenList',
      tokenList.map((token) => ({
        ...token,
        balance: FixedPointMath.toNumber(
          coinsMap[token.type]?.totalBalance ?? ZERO_BIG_NUMBER
        ),
      }))
    );
    form.setValue(
      'lpCoin.balance',
      FixedPointMath.toNumber(
        coinsMap[lpCoinType]?.totalBalance ?? ZERO_BIG_NUMBER
      )
    );
  }, [coinsMap]);

  return (
    <FormProvider {...form}>
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
