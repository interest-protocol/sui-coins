import { PoolTypeEnum } from '@/interface';

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

export const POOL_TYPE = [
  {
    type: FilterTypeEnum.POOL_TYPE,
    description: PoolTypeEnum.clamm.toUpperCase(),
  },
  {
    type: FilterTypeEnum.POOL_TYPE,
    description: PoolTypeEnum.amm.toUpperCase(),
  },
];

export const FILTERS_DATA = [
  {
    label: 'Algorithm',
    data: ALGORITHM_TYPE,
    type: FilterTypeEnum['ALGORITHM'],
  },
  {
    label: 'Pool Type',
    data: POOL_TYPE,
    type: FilterTypeEnum['POOL_TYPE'],
  },
];
