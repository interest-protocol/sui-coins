import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';
import PoolsCard from '@/components/pools-card';

const Pools: FC = () => {
  return (
    <Layout>
      <Box
        my="2xl"
        fontFamily="Proto"
        textAlign="center"
        fontSize={['5xl', '8xl']}
      >
        Pools
        <PoolsCard
          dexName="Dex name"
          coins="SUI • USDC"
          value={36.6}
          fee={100}
          liquidity={123.09}
          volume={839.34}
        />
      </Box>
    </Layout>
  );
};

export default Pools;
