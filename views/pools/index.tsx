import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import Layout from '@/components/layout';

import Header from './header';
import PoolFilter from './pool-filter';
import { PoolTabEnum } from './pools.types';
import PoolCardList from './pools-card-list';

const Pools: FC = () => {
  const [tab, setTab] = useState<PoolTabEnum>(PoolTabEnum.Pools);

  return (
    <Layout>
      <Box py="xl">
        <Header setTab={setTab} currentTab={tab} />
      </Box>
      <Box
        px="s"
        gap="2xs"
        bg="container"
        display="flex"
        maxWidth="100%"
        maxHeight="100%"
        borderRadius="xs"
        flexDirection="column"
        py={['s', 's', 's', '2xl']}
      >
        <PoolFilter />
        <Box
          gap="m"
          display="grid"
          borderRadius="xs"
          p={['s', 's', 's', 'l']}
          gridTemplateColumns={[
            '1fr',
            '1fr',
            '1fr 1fr',
            '1fr 1fr',
            '1fr 1fr 1fr',
          ]}
        >
          <PoolFilter />
          <PoolCardList />
        </Box>
      </Box>
    </Layout>
  );
};

export default Pools;
