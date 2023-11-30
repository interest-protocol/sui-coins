import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

export const ETH_TYPE =
  '0x9f29ed374b212333ccbc7b25ef6edd8121b26c3ed658b5107cd3c13985e6ecb4::eth::ETH';

export const USDC_TYPE =
  '0x9f29ed374b212333ccbc7b25ef6edd8121b26c3ed658b5107cd3c13985e6ecb4::usdc::USDC';

export const COIN_METADATA = {
  [ETH_TYPE]: {
    decimals: 9,
    name: 'ETH',
    symbol: 'ETH',
  },
  [USDC_TYPE]: {
    decimals: 9,
    name: 'USDC',
    symbol: 'USDC',
  },
  [SUI_TYPE_ARG]: {
    decimals: 9,
    name: 'MOV',
    symbol: 'MOVE',
  },
};
