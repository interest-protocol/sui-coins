import { Aggregator, AggregatorProps } from './swap.types';

export const AGGREGATORS_LIST: Record<Aggregator, AggregatorProps> = {
  [Aggregator.Interest]: {
    shortName: Aggregator.Interest,
    url: 'https://www.interestprotocol.com/',
    name: 'Interest Protocol',
    logo: 'https://www.interestprotocol.com/logo.png',
  },
};
