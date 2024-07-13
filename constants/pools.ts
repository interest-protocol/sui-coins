import { FormFilterValue } from '@/views/pools/pool-card/pool-card.types';

import { Network } from './network';

const MOVE_ETH_VOL =
  '0xd6bce9798b62e56fa3565f228ab0beebd127ce005b9b54af6e3c120cacdd14aa';
const ETH_USDC_VOL =
  '0xc9802a075a6d25ddb808bf1f747ce97318b33052236ef158545bf2bd5ad81063';
const BTC_ETH_VOL =
  '0x96051203d9211371690941b23f61c94a28e9a2c669c47e913d91ea2c205b0bda';
const ETH_USDT_VOL =
  '0x0f3110863598370dfd0066099920c6658b81f45ed711bdae12d42452cb1f4dee';
// const MOVE_RUCO_VOL = '';
const USDC_USDT_STABLE =
  '0xaf65b205906d97430de5af2de5407b201c9afb5ea416676c3d990c1c69801035';

const OFFICIAL_POOLS = {
  [Network.DEVNET]: [
    MOVE_ETH_VOL,
    ETH_USDC_VOL,
    ETH_USDT_VOL,
    BTC_ETH_VOL,
    USDC_USDT_STABLE,
  ],
  [Network.TESTNET]: [],
};

export const CATEGORY_POOLS = {
  [FormFilterValue.official]: OFFICIAL_POOLS,
};
