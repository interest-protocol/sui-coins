import type { FC } from 'react';

import type { SVGProps } from '@/components/svg/svg.types';

export interface AnalyticsCardProps {
  title: string;
  quantity: number;
  loading: boolean;
  Icon: FC<SVGProps>;
}
