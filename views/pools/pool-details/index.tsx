import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { DefaultTokenSVG } from '@/svg';

import PoolTitleBar from '../components/pool-title-bar';
import PoolForm from './components/pool-form';
import PoolTransaction from './components/pool-transaction';

const PoolDetails: FC = () => {
  const { push } = useRouter();
  return (
    <Layout>
      <PoolTitleBar
        name="Pool Name Dummy"
        onBack={() => push(Routes[RoutesEnum.Pools])}
        iconTokenList={[DefaultTokenSVG, DefaultTokenSVG]}
      />
      <Box
        mx="auto"
        gap="0.5rem"
        flexDirection="column"
        gridTemplateColumns="62% 38%"
        display={['flex', 'flex', 'flex', 'grid']}
        width={['100%', '100%', '100%', '85%']}
      >
        <PoolForm />
        <PoolTransaction />
      </Box>
    </Layout>
  );
};

export default PoolDetails;
