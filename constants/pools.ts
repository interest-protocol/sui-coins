import { FormFilterValue } from '@/views/pools/pool-card/pool-card.types';

import { Network } from './network';

const MOVE_ETH_VOL =
  '0x3b14604b0198fb9dcac106e6e8be2d978b1338afdd4dbe4cff2d78e6a3bde64e';
const USDC_ETH_VOL =
  '0xca5c0e1d1fc1a062b43b9cb951f2e86a26b61eb0791818f1dd9404a7ae1f0adb';

const OFFICIAL_POOLS = {
  [Network.DEVNET]: [USDC_ETH_VOL, MOVE_ETH_VOL],
  [Network.TESTNET]: [USDC_ETH_VOL, MOVE_ETH_VOL],
};

export const CATEGORY_POOLS = {
  [FormFilterValue.official]: OFFICIAL_POOLS,
};
