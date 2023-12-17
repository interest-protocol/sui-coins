import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import PoolList from './pool-list';

const Pools: FC = () => (
  <Layout>
    <Typography my="2xl" size="large" variant="display" textAlign="center">
      Pools
    </Typography>
    <PoolList />
  </Layout>
);

export default Pools;
