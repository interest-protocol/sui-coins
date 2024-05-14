import { Aggregator, AggregatorPros } from './swap.types';

export const AGGREGATORS_LIST: Record<Aggregator, AggregatorPros> = {
  [Aggregator.Hop]: {
    shortName: 'hop',
    url: 'https://hop.ag/',
    name: 'Hop Aggregator',
    logo: '/images/aggregators/hop.webp',
  },
  [Aggregator.Aftermath]: {
    name: 'Aftermath',
    shortName: 'aftermath',
    url: 'https://aftermath.finance/',
    logo: '/images/aggregators/aftermath.webp',
  },
};
