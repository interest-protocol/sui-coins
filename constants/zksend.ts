import { ZkBagContractOptions } from '@mysten/zksend';

import { Network } from './dapp';

export const ZK_BAG_CONTRACT_IDS: Record<Network, ZkBagContractOptions> = {
  [Network.MAINNET]: {
    packageId:
      '0x5bb7d0bb3240011336ca9015f553b2646302a4f05f821160344e9ec5a988f740',
    bagStoreId:
      '0x65b215a3f2a951c94313a89c43f0adbd2fd9ea78a0badf81e27d1c9868a8b6fe',
    bagStoreTableId:
      '0x616db54ca564660cd58e36a4548be68b289371ef2611485c62c374a60960084e',
  },
  [Network.TESTNET]: {
    packageId:
      '0x7175344e5bb8a85560018f4c54eef10c97a4d0f3a72cb1d938d7ef0f52d19254',
    bagStoreId:
      '0xecaa42a3952c4c46856769b5d9246f1eb5d9ba91316849e6d9ef9f350486ca16',
    bagStoreTableId:
      '0xb0cbc8d39962f36fa65e9d1d1393be10956fb1f46b52b3c952c1df0194fcf5b4',
  },
};

export const ZK_SEND_GAS_BUDGET = 2_500_000;
