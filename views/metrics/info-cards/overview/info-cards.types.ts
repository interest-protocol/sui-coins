import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface InfoCardProps {
  amount: string;
  Icon: FC<SVGProps>;
  description: string;
  loading: boolean;
}
