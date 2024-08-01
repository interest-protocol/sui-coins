import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';
import {
  AirdropSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  FaucetSVG,
  PlusSVG,
  PoolSVG,
  TotalSVG,
} from '@/svg';

import { useMetrics } from './analytics.hooks';
import AnalyticsCard from './analytics-card';

const Analytics: FC = () => {
  const { data: totalCount, isLoading: totalLoading } = useMetrics({});
  const { data: swapCount, isLoading: swapLoading } = useMetrics({
    kind: 'swap',
  });
  const { data: faucetCount, isLoading: faucetLoading } = useMetrics({
    kind: 'faucet',
  });
  const { data: airdropCount, isLoading: airdropLoading } = useMetrics({
    kind: 'airdrop',
  });
  const { data: createPoolCount, isLoading: createPoolLoading } = useMetrics({
    kind: 'createPool',
  });
  const { data: createTokenCount, isLoading: createTokenLoading } = useMetrics({
    kind: 'createToken',
  });
  const { data: addLiquidityCount, isLoading: addLiquidityLoading } =
    useMetrics({ kind: 'addLiquidity' });

  return (
    <Layout title="Analytics">
      <Box
        gap="m"
        display="grid"
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
      >
        <AnalyticsCard
          Icon={TotalSVG}
          title="Total TX"
          quantity={totalCount}
          loading={totalLoading}
        />
        <AnalyticsCard
          title="Airdrop"
          Icon={AirdropSVG}
          quantity={airdropCount}
          loading={airdropLoading}
        />
        <AnalyticsCard
          title="Faucet"
          Icon={FaucetSVG}
          quantity={faucetCount}
          loading={faucetLoading}
        />
        <AnalyticsCard
          title="Swap"
          quantity={swapCount}
          loading={swapLoading}
          Icon={DoubleChevronSVG}
        />
        <AnalyticsCard
          Icon={CirclePlusSVG}
          title="Tokens created"
          quantity={createTokenCount}
          loading={createTokenLoading}
        />
        <AnalyticsCard
          Icon={PoolSVG}
          title="Pools created"
          quantity={createPoolCount}
          loading={createPoolLoading}
        />
        <AnalyticsCard
          Icon={PlusSVG}
          title="Liquidity Deposited"
          quantity={addLiquidityCount}
          loading={addLiquidityLoading}
        />
      </Box>
    </Layout>
  );
};

export default Analytics;
