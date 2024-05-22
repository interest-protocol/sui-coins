import { FormFilterValue } from '@/views/pools/pool-card/pool-card.types';

import { Network } from './network';

const MOVE_ETH_VOL =
  '0x3b14604b0198fb9dcac106e6e8be2d978b1338afdd4dbe4cff2d78e6a3bde64e';
const USDC_ETH_VOL =
  '0xca5c0e1d1fc1a062b43b9cb951f2e86a26b61eb0791818f1dd9404a7ae1f0adb';
const BTC_ETH_VOL =
  '0xa9f1c80606dab0321c0552ae05e8b67e88c560ca844f95823638001a5ed01c91';
const USDT_ETH_VOL =
  '0x85edea93cf5f229d9f10d6cb0318a6b47ef1b79fd6be5c1a4f95ebb3eecad00d';

const OFFICIAL_POOLS = {
  [Network.DEVNET]: [USDC_ETH_VOL, MOVE_ETH_VOL, BTC_ETH_VOL, USDT_ETH_VOL],
  [Network.TESTNET]: [USDC_ETH_VOL, MOVE_ETH_VOL, BTC_ETH_VOL, USDT_ETH_VOL],
};

export const CATEGORY_POOLS = {
  [FormFilterValue.official]: OFFICIAL_POOLS,
};
