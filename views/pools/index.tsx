import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

const Pools: FC = () => {
  return (
    <Layout>
      <Typography my="2xl" size="large" variant="display" textAlign="center">
        Pools
      </Typography>
    </Layout>
  );
};

export default Pools;
