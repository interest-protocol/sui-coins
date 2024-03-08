import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface PoolTitleBarProps {
  name: string;
  onBack: () => void;
  centerTile?: boolean;
  iconTokenList: ReadonlyArray<string | FC<SVGProps>>;
}
