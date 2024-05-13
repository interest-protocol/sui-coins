import { AggregatorPros } from './swap.types';

export const AGGREGATORS_LIST: ReadonlyArray<AggregatorPros> = [
  {
    shortName: 'hop',
    url: 'https://hop.ag/',
    name: 'Hop Aggregator',
    logo: '/images/aggregators/hop.webp',
  },
  {
    name: 'Aftermath',
    shortName: 'aftermath',
    url: 'https://aftermath.finance/',
    logo: '/images/aggregators/aftermath.webp',
  },
];
