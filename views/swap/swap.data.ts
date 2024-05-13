import { AggregatorType } from './swap.types';

export const AGGREGATORS_LIST: ReadonlyArray<{
  description: string;
  type: AggregatorType;
}> = [
  {
    type: 'hop',
    description: 'Hop Aggregator',
  },
  {
    type: 'aftermath',
    description: 'Aftermath',
  },
];
