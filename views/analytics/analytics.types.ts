import { ChartsProps } from '@interest-protocol/ui-kit/dist/components/charts/charts.types';
import type { FC } from 'react';

import type { SVGProps } from '@/components/svg/svg.types';

export interface AnalyticsCardProps {
  title: string;
  quantity: number;
  loading: boolean;
  Icon: FC<SVGProps>;
}

export interface AnalyticsCardChartProps
  extends AnalyticsCardProps,
    Pick<ChartsProps, 'data'> {
  label: string;
}
