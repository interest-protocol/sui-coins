import { Box, Chart } from '@interest-protocol/ui-kit';
import { last } from 'ramda';
import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getMetric, TFilter, ValuesInTimestamp } from '@/api/metrics';
import { formatDollars } from '@/utils';

import ChartWrapper from '../components/chart-wrapper';
import { DataPoint } from '../metrics.types';

const TotalLiquidity: FC = () => {
  const [data, setData] = useState<Array<DataPoint>>([]);
  const [isLoading, setIsLoading] = useState(!data.length);

  const [filter, setFilter] = useState<TFilter>('all');

  useEffect(() => {
    setIsLoading(true);
    getMetric('get-total-liquidity', `filter=${filter}`).then(
      (total: ValuesInTimestamp) => {
        const newData = total.map(({ timestamp, value }) => {
          const date = new Date(timestamp * 1000);

          return {
            date,
            amount: value,
            description: date.toUTCString(),
            day: `${date.getDate()}/${date.getMonth() + 1}`,
          };
        });

        setData(newData);
        setIsLoading(false);
      }
    );
  }, [filter]);

  return (
    <ChartWrapper
      title="Total liquidity"
      filters={[
        {
          label: 'All time',
          isSelected: filter === 'all',
          onClick: () => setFilter('all'),
        },
        {
          label: '1 Month',
          isSelected: filter === 'month',
          onClick: () => setFilter('month'),
        },
        {
          label: '14 Days',
          isSelected: filter === 'halfMonth',
          onClick: () => setFilter('halfMonth'),
        },
      ]}
      resume={{
        amount: formatDollars(last(data)?.amount ?? 0),
        description: `${last(data)?.description}`,
      }}
      isLoading={isLoading}
    >
      {isLoading ? (
        <Box px="xl">
          <Skeleton height="12rem" />
          <Skeleton height="2rem" style={{ marginTop: '0.5rem' }} />
        </Box>
      ) : (
        <Chart
          data={data.map((item) => ({
            amount: item.amount,
            description: item.description,
            date: item.day,
          }))}
          variant="area"
        />
      )}
    </ChartWrapper>
  );
};

export default TotalLiquidity;
