import { InterestSVG } from '@/svg';

import { Aggregator, AggregatorProps } from './swap.types';

export const AGGREGATORS_LIST: Record<Aggregator, AggregatorProps> = {
  [Aggregator.Interest]: {
    url: '',
    name: 'Interest',
    Icon: InterestSVG,
    key: Aggregator.Interest,
  },
};
