import { FilterItemProps } from '../../pools.types';

export interface FilterSelectedItemProps {
  selectedItem: FilterItemProps;
  onClick: (item: FilterItemProps) => void;
}
