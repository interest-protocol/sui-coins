import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

import { FilterItemProps, FilterTypeEnum } from '../../pools.types';

export interface DropdownProps {
  Icon: FC<SVGProps>;
  label?: string;
  disabled?: boolean;
  type: FilterTypeEnum;
  filterData: ReadonlyArray<FilterItemProps>;
}
