import { Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC, useId } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { BaseChartProps } from './charts.types';
import CustomizedAxisTick from './customized-axis-tick';
import CustomTooltip from './tooltip';

const LinearChart: FC<BaseChartProps> = ({ data, height, width }) => {
  const id = useId();
  const { colors } = useTheme() as Theme;

  return (
    <ResponsiveContainer width={width || '100%'} height={height || 200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient
            x1="0"
            y1="0"
            x2="0"
            y2="1"
            id={`chartGradient-${id}`}
          >
            <stop offset="50%" stopColor={colors['primary']} />
            <stop offset="100%" stopColor="rgba(180, 197, 255, 0)" />
          </linearGradient>
        </defs>
        <Tooltip
          animationDuration={600}
          content={<CustomTooltip />}
          animationEasing="ease-in-out"
          cursor={{
            strokeWidth: 0.5,
            strokeDasharray: '3 3',
            stroke: colors['outline'],
          }}
        />
        <CartesianGrid />
        <YAxis
          dataKey="amount"
          tickLine={false}
          tick={<CustomizedAxisTick dy={0} money />}
        />
        <XAxis
          tickCount={6}
          type="category"
          dataKey="day"
          tickLine={false}
          interval="preserveStartEnd"
          tick={<CustomizedAxisTick dy={10} />}
        />
        <Area
          type="linear"
          dataKey="amount"
          fillOpacity={0.5}
          strokeWidth="2px"
          stroke={colors['primary']}
          fill={`url(#chartGradient-${id})`}
          activeDot={{
            r: 5,
            stroke: colors['primary'],
            fill: colors['lowestContainer'],
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LinearChart;
