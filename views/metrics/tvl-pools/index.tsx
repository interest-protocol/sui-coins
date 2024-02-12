import { Box, Chart } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { getMetric, TFilter } from '@/api/metrics';

import ChartWrapper from '../components/chart-wrapper';
import { DataPie } from '../metrics.types';
import { getPoolFromMetricLabel } from '../metrics.utils';
import { SEMANTICS_COLORS } from './tvl-pools.data';

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
              semanticColors={SEMANTICS_COLORS}
            />
          </Box>
        )}
      </ChartWrapper>
    </Box>
  );
};

export default TVLPools;
