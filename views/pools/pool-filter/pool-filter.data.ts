import { FormFilterValue } from '../pool-card/pool-card.types';
import { FilterItemProps, FilterTypeEnum } from '../pools.types';

export const ALGORITHM_TYPE: Array<FilterItemProps> = [
  {
    type: FilterTypeEnum.ALGORITHM,
    value: FormFilterValue.stable,
  },
  {
    type: FilterTypeEnum.ALGORITHM,
    value: FormFilterValue.volatile,
  },
];

export const CATEGORY_TYPE: Array<FilterItemProps> = [
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.official,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.partner,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.all,
  },
];

export const ALGORITHM_DATA = [
  {
    label: 'Algorithm',
    data: ALGORITHM_TYPE,
    type: FilterTypeEnum['ALGORITHM'],
  },
];

export const CATEGORY_DATA = [
  {
    label: 'category',
    data: CATEGORY_TYPE,
    type: FilterTypeEnum['CATEGORY'],
  },
];
