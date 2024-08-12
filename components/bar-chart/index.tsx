import { Theme, useTheme } from '@interest-protocol/ui-kit';
import { BaseChartProps } from '@interest-protocol/ui-kit/dist/components/charts/charts.types';
import { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { v4 } from 'uuid';

import { formatMoney } from '@/utils';

import CustomCursor from './custom-cursor';
import CustomTooltip from './custom-tooltip';
import CustomXAxisTick from './x-axis-tick';

const BarChartComponent: FC<BaseChartProps> = ({ data, height, width }) => {
  const { colors } = useTheme() as Theme;

  return (
    <ResponsiveContainer width={width || '100%'} height={height || 200}>
      <BarChart
        data={data}
        barCategoryGap="1%"
        margin={{
          top: 20,
          left: 20,
          right: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid
          opacity={0.25}
          vertical={false}
          stroke="outlineVariant"
        />
        <XAxis
          type="category"
          dataKey="x"
          tickLine={false}
          tick={<CustomXAxisTick />}
          interval="preserveStartEnd"
        />
        <Tooltip
          cursor={<CustomCursor />}
          content={<CustomTooltip />}
          animationEasing="ease-in-out"
          contentStyle={{ zIndex: 999 }}
        />
        <Bar key={v4()} dataKey="amount" fill={colors['primary']}>
          <LabelList
            position="top"
            dataKey="amount"
            color={colors['onSurface']}
            formatter={(value: number) =>
              isNaN(value) ? value : formatMoney(Number(value), 0, true)
            }
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
