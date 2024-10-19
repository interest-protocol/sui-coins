import { TimeScale } from '@interest-protocol/dca-sdk';

export enum DCAMessagesEnum {
  leastOneSui = 'You must have at least 1 SUI on your wallet',
  notEnoughToken = 'You do not have enough tokens.',
  noMarket = 'There is no market for these coins.',
  starting = 'We are starting the DCA, and you will let you know when it is done',
  dcaFailure = 'Your DCA failed, please try again or contact the support team',
  dcaSuccess = 'Your DCA was successfully, and you can check it on the Explorer',
  dcaOrderMinAmount = 'You must set at least 3$ per order',
}

export const PERIODICITY: Record<TimeScale, string> = {
  [TimeScale.Seconds]: 'second',
  [TimeScale.Minutes]: 'minute',
  [TimeScale.Hour]: 'hour',
  [TimeScale.Day]: 'day',
  [TimeScale.Week]: 'week',
  [TimeScale.Month]: 'month',
};

export const TIME_SCALE_TO_MS = {
  [TimeScale.Seconds]: 1000,
  [TimeScale.Minutes]: 60000,
  [TimeScale.Hour]: 3600000,
  [TimeScale.Day]: 86400000,
  [TimeScale.Week]: 604800000,
  [TimeScale.Month]: 2419200000,
};
