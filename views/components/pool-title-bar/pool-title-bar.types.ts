import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface PoolTitleBarProps {
  name: string;
  onBack: () => void;
  isPageTitle?: boolean;
  centerTile?: boolean;
  iconTokenList: ReadonlyArray<string | FC<SVGProps>>;
}
