import { FilterItemProps, FilterTypeEnum } from '../../pools.types';

export interface DropdownProps {
  label?: string;
  disabled?: boolean;
  type: FilterTypeEnum;
  filterData: ReadonlyArray<FilterItemProps>;
}
