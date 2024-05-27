import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { PoolForm as PoolFormType } from '@/views/pools/pools.types';

import PoolTitleBar from '../components/pool-title-bar';
import { usePoolDetails } from './pool-details.context';
import { PoolDetailsFormProps } from './pool-details.types';
import PoolForm from './pool-form';
import PoolInfo from './pool-info';

const PoolDetails: FC<PoolDetailsFormProps> = ({
  poolOptionView,
  handleOptionTab,
}) => {
  const { push } = useRouter();

  const { pool, metadata } = usePoolDetails();

  const { getValues, setValue } = useFormContext<PoolFormType>();

  useEffect(() => {
    if (!pool || !metadata) return;

    const formTokenList = getValues('tokenList');

    if (formTokenList.every(({ type }) => type)) return;

    const tokenList: string[] = Object.values(pool.coinTypes).slice(0, 2);
    const lpCoinType = pool.coinTypes.lpCoin;

    setValue(
      'tokenList',
      tokenList.map((tokenType) => ({
        value: '0',
        locked: true,
        type: tokenType,
        decimals: metadata[tokenType].decimals,
        symbol: metadata[tokenType].symbol.replace('SUI', 'MOVE'),
      }))
    );

    setValue('lpCoin', {
      value: '0',
      decimals: 9,
      locked: true,
      type: lpCoinType,
      symbol: metadata[lpCoinType].symbol.replace('SUI', 'MOVE'),
    });

    setValue('pool', pool);
  }, [pool, metadata]);

  return (
    <Layout>
      <PoolTitleBar onBack={() => push(Routes[RoutesEnum.Pools])} />
      <Box
        gap="xs"
        mx="auto"
        maxWidth="65rem"
        overflow="hidden"
        flexDirection="column"
        gridTemplateColumns="3fr 2fr"
        display={['flex', 'flex', 'flex', 'grid']}
        alignItems={['unset', 'unset', 'unset', 'start']}
      >
        <PoolForm
          poolOptionView={poolOptionView}
          handleOptionTab={handleOptionTab}
        />
        <PoolInfo />
      </Box>
    </Layout>
  );
};

export default PoolDetails;
