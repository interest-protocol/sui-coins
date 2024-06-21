import { Aggregator, AggregatorProps } from './swap.types';

export const AGGREGATORS_LIST: Record<Aggregator, AggregatorProps> = {
  [Aggregator.Hop]: {
    info: 'Faster',
    key: Aggregator.Hop,
    url: 'https://hop.ag/',
    name: 'Hop Aggregator',
    logo: '/images/aggregators/hop.webp',
  },
  [Aggregator.Aftermath]: {
    name: 'Aftermath',
    key: Aggregator.Aftermath,
    url: 'https://aftermath.finance/',
    logo: '/images/aggregators/aftermath.webp',
  },
  [Aggregator.Interest]: {
    url: '',
    disabled: true,
    name: 'Interest',
    key: Aggregator.Interest,
    logo: 'https://interestprotocol.com/logo.png',
  },
};

export enum SwapMessagesEnum {
  leastOneSui = 'You must have at least 1 SUI on your wallet',
  notEnoughToken = 'You do not have enough tokens.',
  noMarket = 'There is no market for these coins.',
  swapping = 'We are swapping, and you will let you know when it is done',
  swapFailure = 'Your swap failed, please try to increment your slippage and try again or contact the support team',
  swapSuccess = 'Your swap was successfully, and you can check it on the Explorer',
}
