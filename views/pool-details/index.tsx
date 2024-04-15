import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
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
  const { coinsMap } = useWeb3();

  const { pool, metadata } = usePoolDetails();

  const form = useFormContext<PoolFormType>();

  useEffect(() => {
    if (!pool || !metadata) return;

    const formTokenList = form.getValues('tokenList');

    if (formTokenList.length) return;

    const tokenList: string[] = Object.values(pool.coinTypes).slice(0, 2);
    const lpCoinType = pool.coinTypes.lpCoin;

    form.setValue(
      'tokenList',
      tokenList.map((tokenType) => ({
        balance: FixedPointMath.toNumber(
          coinsMap[tokenType]
            ? BigNumber(coinsMap[tokenType].balance)
            : ZERO_BIG_NUMBER
        ),
        type: tokenType,
        symbol: metadata[tokenType].symbol.replace('SUI', 'MOV'),
        decimals: metadata[tokenType].decimals,
        value: '0',
        locked: true,
      }))
    );
    form.setValue('lpCoin', {
      balance: FixedPointMath.toNumber(
        coinsMap[pool.coinTypes.lpCoin]
          ? BigNumber(coinsMap[pool.coinTypes.lpCoin].balance)
          : ZERO_BIG_NUMBER
      ),
      symbol: metadata[lpCoinType].symbol.replace('SUI', 'MOV'),
      decimals: 9,
      type: lpCoinType,
      value: '0',
      locked: true,
    });
    form.setValue('pool', pool);
  }, [coinsMap, pool, metadata]);

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
