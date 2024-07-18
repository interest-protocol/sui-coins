import { FormFilterValue } from '@/views/pools/pool-card/pool-card.types';

import { Network } from './network';

const MOVE_ETH_VOL =
  '0xbaa560cd16ce06c3b629c27dca8bef73368af59b9afdaf73986badcb5335082a';
const ETH_USDC_VOL =
  '0x865b2938c36bed3bb9b37ed2dd09d22e3f0d25883c3a636a838c90dfb9638f2c';
const BTC_ETH_VOL =
  '0x409764c95ebff9c5e5c13cb36a87d3facdfb81a69832ef94aece98699bfaf79f';
const ETH_USDT_VOL =
  '0xa37298efd18e5f8495158889bc198fb8ed443af40bdcfa5a547eedfe639e5bd3';
const MOVE_RUCO_VOL =
  '0x5751b9a77962aa5116c4958609e26b0a84a5c5758430e7635d059518740d1e1c';
const USDC_USDT_STABLE =
  '0xbe3139141ae14e7e9fa77064701742ce8653d6d44e4782e199881ecd806d96ac';

const OFFICIAL_POOLS = {
  [Network.DEVNET]: [
    MOVE_RUCO_VOL,
    MOVE_ETH_VOL,
    ETH_USDC_VOL,
    BTC_ETH_VOL,
    ETH_USDT_VOL,
    USDC_USDT_STABLE,
  ],
  [Network.TESTNET]: [],
};

export const CATEGORY_POOLS = {
  [FormFilterValue.official]: OFFICIAL_POOLS,
};
