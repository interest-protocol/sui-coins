import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface PoolTitleBarProps {
  name?: string;
  onBack: () => void;
  iconTokenList?: ReadonlyArray<string | FC<SVGProps>>;
}
