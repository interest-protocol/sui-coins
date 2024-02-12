import { Box, Chart } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getMetric, TFilter } from '@/api/metrics';

import ChartWrapper from '../components/chart-wrapper';
import { DataPie } from '../metrics.types';
import { getPoolFromMetricLabel } from '../metrics.utils';

const TVLPools: FC = () => {
  const [data, setData] = useState<Array<DataPie>>([]);
  const [isLoading, setIsLoading] = useState(!data.length);

  const [filter, setFilter] = useState<TFilter>('daily');

  useEffect(() => {
    setIsLoading(true);
    getMetric('get-tvl-by-pool').then((total) => {
      const newData = total.map(
        ({
          label,
          ...info
        }: {
          label: string;
          timestamp: number;
          amount: number;
        }) => {
          const pool = getPoolFromMetricLabel(label);

          if (!pool) return { ...info, label };

          const {
            token0: { symbol: symbolA },
            token1: { symbol: symbolB },
          } = pool;

          return { ...info, label: `${symbolA}•${symbolB}` };
        }
      );

      setData(newData);
      setIsLoading(false);
    });
  }, [filter]);

  return (
    <Box width="100%">
      <ChartWrapper
        title="TVL Pools"
        filters={[
          {
            label: 'Daily',
            isSelected: filter === 'daily',
            onClick: () => setFilter('daily'),
          },
          {
            label: 'All time',
            isSelected: filter === 'all',
            onClick: () => setFilter('all'),
          },
        ]}
      >
        {isLoading ? (
          <Box px="xl">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="1rem"
              width="10rem"
              mx="auto"
            >
              <Skeleton height="10rem" width="10rem" borderRadius="10rem" />
              <Skeleton height="1.5rem" width="5rem" />
            </Box>
          </Box>
        ) : (
          <Box className="box-pie">
            <Chart
              variant="pie"
              label="Pools"
              data={data.map((item) => ({
                date: item.label,
                amount: item.amount,
                description: item.label,
              }))}
              semanticColors={[
                { dark: '#BBF264', light: '#88CC16' },
                { dark: '#EEA5A5', light: '#EF4444' },
                { dark: '#FDBA74', light: '#997316' },
                { dark: '#67E8F9', light: '#00B6D4' },
                { dark: '#AABA74', light: '#559E0B' },
                { dark: '#DDB4FE', light: '#AA55F7' },
                { dark: '#FFA8D4', light: '#EC4899' },
                { dark: '#19A8D4', light: '#194899' },
                { dark: '#29FFD4', light: '#29FF99' },
              ]}
            />
          </Box>
        )}
      </ChartWrapper>
    </Box>
  );
};

export default TVLPools;
