import { Aggregator, AggregatorPros } from './swap.types';

export const AGGREGATORS_LIST: Record<Aggregator, AggregatorPros> = {
  [Aggregator.Native]: {
    shortName: 'Native',
    url: 'https://www.interestprotocol.com/',
    name: 'Interest Protocol',
    logo: 'https://www.interestprotocol.com/logo.png',
  },
};
