import { Box } from '@interest-protocol/ui-kit';
import { toPairs, values } from 'ramda';
import { FC } from 'react';

import Layout from '@/components/layout';
import { GroupSVG, TransactionSVG } from '@/svg';

import { useWeeklyMetrics } from './analytics.hooks';
import AnalyticsCard from './analytics-card';
import AnalyticsCardList from './analytics-card-list';
import AnalyticsChart from './analytics-chart';

const Analytics: FC = () => {
  const { data: weeklyMetrics, isLoading: loadingWeeklyMetrics } =
    useWeeklyMetrics();

  return (
    <Layout title="TX Analytics">
      <Box
        gap="m"
        display="grid"
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
      >
        <AnalyticsChart
          title="Weekly Transactions"
          loading={loadingWeeklyMetrics}
          data={toPairs(weeklyMetrics?.weeklyTXs).map(
            ([timestamp, value], index) => ({
              amount: value,
              x: `Week ${index + 1}`,
              description: `Week from ${new Date(Number(timestamp)).toLocaleDateString()}`,
            })
          )}
        />
        <AnalyticsChart
          title="Weekly Users"
          loading={loadingWeeklyMetrics}
          data={toPairs(weeklyMetrics?.weeklyUsers).map(
            ([timestamp, value], index) => ({
              amount: value,
              x: `Week ${index + 1}`,
              description: `Week from ${new Date(Number(timestamp)).toLocaleDateString()}`,
            })
          )}
        />
        <AnalyticsCard
          title="Weekly TXs"
          Icon={TransactionSVG}
          loading={loadingWeeklyMetrics}
          quantity={values(weeklyMetrics?.weeklyTXs)?.reverse()?.[0] ?? 0}
        />
        <AnalyticsCard
          Icon={GroupSVG}
          title="Weekly Active Users"
          loading={loadingWeeklyMetrics}
          quantity={values(weeklyMetrics?.weeklyUsers)?.reverse()?.[0] ?? 0}
        />
        <AnalyticsCardList />
      </Box>
    </Layout>
  );
};

export default Analytics;
