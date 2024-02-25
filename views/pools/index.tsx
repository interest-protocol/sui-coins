import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';

import Header from './header';
import PoolCard from './pool-card';
import { PoolTabEnum } from './pools.types';

const Pools: FC = () => {
  const { network } = useNetwork();

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
        <Box
          gap="m"
          my="xl"
          px="xs"
          display="grid"
          gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
        >
          {RECOMMENDED_POOLS[network].map((pool) => (
            <PoolCard key={v4()} {...pool} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Pools;
