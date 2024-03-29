import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import Layout from '@/components/layout';

import Header from './header';
import PoolCardList from './pool-card-list';
import PoolFilter from './pool-filter';
import { PoolTabEnum } from './pools.types';

const Pools: FC = () => {
  const [tab, setTab] = useState<PoolTabEnum>(PoolTabEnum.Pools);

  return (
    <Layout title="Pools">
      <Box mx={['0', '0', '0', '0', 'm']}>
        <Box py="xl">
          <Header setTab={setTab} currentTab={tab} />
        </Box>
        <Box
          gap="2xs"
          bg="container"
          maxWidth="100%"
          maxHeight="100%"
          display="flex"
          flexDirection="column"
          borderRadius="xs"
          px="m"
          py={['s', 's', 's', '2xl']}
        >
          <PoolFilter />
          <PoolCardList />
        </Box>
      </Box>
    </Layout>
  );
};

export default Pools;
