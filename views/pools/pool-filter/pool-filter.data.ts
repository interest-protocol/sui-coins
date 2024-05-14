import { AlgorithmEnum, CategoryEnum } from '../pool-card/pool-card.types';
import { FilterItemProps, FilterTypeEnum } from '../pools.types';

export const ALGORITHM_TYPE: Array<FilterItemProps> = [
  {
    type: FilterTypeEnum.ALGORITHM,
    description: AlgorithmEnum.stable,
  },
  {
    type: FilterTypeEnum.ALGORITHM,
    description: AlgorithmEnum.volatile,
  },
];

export const CATEGORY_TYPE: Array<FilterItemProps> = [
  {
    type: FilterTypeEnum.CATEGORY,
    description: CategoryEnum.official,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    description: CategoryEnum.partner,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    description: CategoryEnum.all,
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
