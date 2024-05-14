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

export enum SwapMessagesEnum {
  leastOneSui = 'You must have at least 1 SUI on your wallet',
  notEnoughToken = 'You do not have enough tokens.',
  swapping = 'We are swapping, and you will let you know when it is done',
  swapFailure = 'Your swap failed, please try to increment your slippage and try again or contact the support team',
  swapSuccess = 'Your swap was successfully, and you can check it on the Explorer',
}
