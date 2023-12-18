import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface ReceiveSectionLineProps {
  symbol: string;
  balance: string;
  Icon?: FC<SVGProps>;
}

export interface ReceiveSectionProps {
  items: ReadonlyArray<ReceiveSectionLineProps>;
}
