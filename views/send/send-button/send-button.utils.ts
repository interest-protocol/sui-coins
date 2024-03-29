import { SendArguments, SendCoin } from './send-button.types';

export const isSendCoin = (args: SendArguments): args is SendCoin =>
  !!(args as SendCoin).type;
