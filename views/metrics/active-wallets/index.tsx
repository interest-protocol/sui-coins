import { Box, Chart } from '@interest-protocol/ui-kit';
import { last, values } from 'ramda';
import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getMetric, TFilter, ValuesInTimestamp } from '@/api/metrics';

import ChartWrapper from '../components/chart-wrapper';
import { DataPoint } from '../metrics.types';

const ActiveWallets: FC = () => {
  const [data, setData] = useState<Array<DataPoint>>([]);
  const [isLoading, setIsLoading] = useState(!data.length);

  const [filter, setFilter] = useState<TFilter>('all');

  useEffect(() => {
    setIsLoading(true);
    getMetric(
      'get-total-active-wallets',
      `filter=${String(filter === 'daily')}`
    ).then((total: ValuesInTimestamp) => {
      const newData = values(
        total.reduce(
          (acc, info) => ({
            ...acc,
            [info.timestamp]: info,
          }),
          {} as Record<
            number,
            {
              timestamp: number;
              value: number;
            }
          >
        )
      ).map(({ timestamp, value }) => {
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
    });
  }, [filter]);

  return (
    <Box width="100%">
      <ChartWrapper
        title="Active Wallets"
        filters={[
          {
            label: 'Total',
            isSelected: filter === 'all',
            onClick: () => setFilter('all'),
          },
          {
            label: 'Daily',
            isSelected: filter === 'daily',
            onClick: () => setFilter('daily'),
          },
        ]}
        resume={{
          amount: String(last(data)?.amount),
          description: `${last(data)?.description}`,
        }}
        isLoading={isLoading}
      >
        {isLoading ? (
          <Box px="xl">
            <Skeleton height="10rem" />
            <Skeleton height="2rem" style={{ marginTop: '0.5rem' }} />
          </Box>
        ) : (
          <Box>
            <Chart
              variant="bar"
              data={data.map((item) => ({
                date: item.day,
                amount: item.amount,
                description: item.description,
              }))}
            />
          </Box>
        )}
      </ChartWrapper>
    </Box>
  );
};

export default ActiveWallets;
