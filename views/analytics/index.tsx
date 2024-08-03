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
  UserSVG,
} from '@/svg';

import {
  usePoolsMetrics,
  useQuestMetrics,
  useQuestProfiles,
} from './analytics.hooks';
import AnalyticsCard from './analytics-card';

const Analytics: FC = () => {
  const { data: totalCount, isLoading: totalLoading } = useQuestMetrics({});
  const { data: usersCount, isLoading: usersLoading } = useQuestProfiles();
  const { data: swapCount, isLoading: swapLoading } = useQuestMetrics({
    kind: 'swap',
  });
  const { data: faucetCount, isLoading: faucetLoading } = useQuestMetrics({
    kind: 'faucet',
  });
  const { data: airdropCount, isLoading: airdropLoading } = useQuestMetrics({
    kind: 'airdrop',
  });
  const { data: poolsCount, isLoading: poolsLoading } = usePoolsMetrics();
  const { data: createTokenCount, isLoading: createTokenLoading } =
    useQuestMetrics({
      kind: 'createToken',
    });
  const { data: addLiquidityCount, isLoading: addLiquidityLoading } =
    useQuestMetrics({ kind: 'addLiquidity' });

  return (
    <Layout title="TX Analytics">
      <Box
        gap="m"
        display="grid"
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
      >
        <AnalyticsCard
          Icon={TotalSVG}
          title="Total TXs"
          quantity={totalCount}
          loading={totalLoading}
        />
        <AnalyticsCard
          title="Unique Users"
          Icon={UserSVG}
          quantity={usersCount}
          loading={usersLoading}
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
          title="Swaps"
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
          quantity={+poolsCount}
          loading={poolsLoading}
        />
        <AnalyticsCard
          Icon={PlusSVG}
          title="Liquidity Management"
          quantity={addLiquidityCount}
          loading={addLiquidityLoading}
        />
      </Box>
    </Layout>
  );
};

export default Analytics;
