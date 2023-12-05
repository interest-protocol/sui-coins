import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface CompositionItemProps {
  Logo: FC<SVGProps>;
  symbol: string;
  amount: string;
}
