import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import Layout from '@/components/layout';

import Header from './header';
import { PoolTabEnum } from './pools.types';

const Pools: FC = () => {
  const [tab, setTab] = useState<PoolTabEnum>(PoolTabEnum.Pools);

  return (
    <Layout title="Pools">
      <Box
        p={['s', 's', 's', 'l']}
        borderRadius="xs"
        bg="container"
        mx={['0', '0', '0', '0', '9xl']}
      >
        <Header setTab={setTab} currentTab={tab} />
      </Box>
    </Layout>
  );
};

export default Pools;
