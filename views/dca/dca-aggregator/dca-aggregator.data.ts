import { AftermathSVG, HopSVG } from '@/svg';

import { Aggregator, AggregatorProps } from '../dca.types';

export const AGGREGATORS_LIST: Record<Aggregator, AggregatorProps> = {
  [Aggregator.Hop]: {
    Icon: HopSVG,
    key: Aggregator.Hop,
    url: 'https://hop.ag/',
    name: 'Hop Aggregator',
  },
  [Aggregator.Aftermath]: {
    name: 'Aftermath',
    Icon: AftermathSVG,
    key: Aggregator.Aftermath,
    url: 'https://aftermath.finance/',
  },
};
