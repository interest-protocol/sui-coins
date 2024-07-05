import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { getSymbolByType } from '@/utils';
import { PoolForm as PoolFormType } from '@/views/pools/pools.types';

import PoolTitleBar from '../components/pool-title-bar';
import { usePoolDetails } from './pool-details.context';
import { PoolDetailsFormProps } from './pool-details.types';
import PoolForm from './pool-form';
import PoolInfo from './pool-info';

const PoolDetails: FC<PoolDetailsFormProps> = () => {
  const { push } = useRouter();

  const { pool, metadata } = usePoolDetails();

  const { getValues, setValue } = useFormContext<PoolFormType>();

  useEffect(() => {
    if (!pool || !metadata) return;

    const formTokenList = getValues('tokenList');

    if (formTokenList.every(({ type }) => type)) return;

    const tokenList = pool.coinTypes as ReadonlyArray<`0x${string}`>;

    const lpCoinType = String(pool.lpCoinType) as `0x${string}`;

    setValue(
      'tokenList',
      tokenList.map((tokenType) => ({
        value: '0',
        locked: true,
        type: tokenType,
        symbol: metadata[tokenType].symbol,
        decimals: metadata[tokenType].decimals,
      }))
    );

    setValue('lpCoin', {
      value: '0',
      decimals: 9,
      locked: true,
      type: lpCoinType,
      symbol: metadata[lpCoinType]?.symbol ?? getSymbolByType(lpCoinType),
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
        alignItems="start"
        flexDirection="column"
        gridTemplateColumns="3fr 2fr"
        display={['flex', 'flex', 'flex', 'grid']}
      >
        <PoolForm />
        <PoolInfo />
      </Box>
    </Layout>
  );
};

export default PoolDetails;
