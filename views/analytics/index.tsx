import { Box, Typography } from '@interest-protocol/ui-kit';
import { toPairs, values } from 'ramda';
import { FC } from 'react';

import BarChartComponent from '@/components/bar-chart';
import Layout from '@/components/layout';
import {
  AirdropSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  FaucetSVG,
  GroupSVG,
  PlusSVG,
  PoolSVG,
  TotalSVG,
  TransactionSVG,
  UserSVG,
} from '@/svg';

import {
  usePoolsMetrics,
  useQuestMetrics,
  useQuestProfiles,
  useWeeklyMetrics,
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
  const { data: weeklyMetrics, isLoading: loadingWeeklyTXs } =
    useWeeklyMetrics();

  return (
    <Layout title="TX Analytics">
      <Box
        gap="m"
        display="grid"
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
      >
        <Box
          p="2xl"
          gap="m"
          display="flex"
          gridRow="span 2"
          borderRadius="s"
          bg="highContainer"
          flexDirection="column"
        >
          <Typography variant="title" size="large" color="onSurface">
            Weekly Transactions
          </Typography>
          <BarChartComponent
            data={toPairs(weeklyMetrics?.weeklyTXs).map(
              ([timestamp, value], index) => ({
                amount: value,
                x: `Week ${index + 1}`,
                description: `Week from ${new Date(Number(timestamp)).toLocaleDateString()}`,
              })
            )}
          />
        </Box>
        <Box
          p="2xl"
          gap="m"
          display="flex"
          gridRow="span 2"
          borderRadius="s"
          bg="highContainer"
          flexDirection="column"
        >
          <Typography variant="title" size="large" color="onSurface">
            Weekly Users
          </Typography>
          <BarChartComponent
            data={toPairs(weeklyMetrics?.weeklyUsers).map(
              ([timestamp, wallets], index) => ({
                amount: wallets.length,
                x: `Week ${index + 1}`,
                description: `Week from ${new Date(Number(timestamp)).toLocaleDateString()}`,
              })
            )}
          />
        </Box>
        <AnalyticsCard
          title="Last Week TXs"
          Icon={TransactionSVG}
          loading={loadingWeeklyTXs}
          quantity={values(weeklyMetrics?.weeklyTXs).reverse()[0]}
        />
        <AnalyticsCard
          Icon={GroupSVG}
          title="Last Week Users"
          loading={loadingWeeklyTXs}
          quantity={values(weeklyMetrics?.weeklyUsers).reverse()[0]?.length}
        />
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
