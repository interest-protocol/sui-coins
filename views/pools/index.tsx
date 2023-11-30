import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';
import { DefaultTokenSVG } from '@/svg';

import PoolTitleBar from './pool-title-bar';

const Pools: FC = () => {
  return (
    <Layout>
      <Typography my="2xl" size="large" variant="display" textAlign="center">
        Pools
      </Typography>
      <PoolTitleBar
        poolName="Pool Name"
        poolEnterCoin={
          <DefaultTokenSVG width="100%" maxWidth="2.5rem" maxHeight="2.5rem" />
        }
        poolExitCoin={
          <DefaultTokenSVG width="100%" maxWidth="2.5rem" maxHeight="2.5rem" />
        }
      />
    </Layout>
  );
};

export default Pools;
