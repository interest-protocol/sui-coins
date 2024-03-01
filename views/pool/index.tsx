import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import PoolFilter from './pool-filter';

const Pool: FC = () => {
  return (
    <Layout>
      <Box
        my="xl"
        mx="2xs"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        borderRadius="xs"
        color="onSurface"
        bg="container"
      >
        <PoolFilter />
      </Box>
    </Layout>
  );
};

export default Pool;
