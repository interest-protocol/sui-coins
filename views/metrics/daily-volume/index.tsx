import { Box, Chart } from '@interest-protocol/ui-kit';
import { last, values } from 'ramda';
import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getMetric, ValuesInTimestamp } from '@/api/metrics';
import { formatDollars } from '@/utils';

import ChartWrapper from '../components/chart-wrapper';
import { DataPoint } from '../metrics.types';

const DailyVolume: FC = () => {
  const [data, setData] = useState<Array<DataPoint>>([]);
  const [isLoading, setIsLoading] = useState(!data.length);

  useEffect(() => {
    getMetric('get-daily-volume').then((total: ValuesInTimestamp) => {
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
  }, []);

  return (
    <ChartWrapper
      title="Daily Volume"
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
          variant="bar"
        />
      )}
    </ChartWrapper>
  );
};

export default DailyVolume;
