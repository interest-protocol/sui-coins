import { AlgorithmEnum } from '../pool-card/pool-card.types';
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

export const FILTERS_DATA = [
  {
    label: 'Algorithm',
    data: ALGORITHM_TYPE,
    type: FilterTypeEnum['ALGORITHM'],
  },
];
