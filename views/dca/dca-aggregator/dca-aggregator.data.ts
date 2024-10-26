import { AftermathSVG } from '@/svg';

import { Aggregator, AggregatorProps } from '../dca.types';

export const AGGREGATORS_LIST: Record<Aggregator, AggregatorProps> = {
  [Aggregator.Aftermath]: {
    name: 'Aftermath',
    Icon: AftermathSVG,
    key: Aggregator.Aftermath,
    url: 'https://aftermath.finance/',
  },
};
