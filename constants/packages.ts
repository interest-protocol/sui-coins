import { Network } from '@/constants/network';

export const AMM_CURVES = {
  [Network.DEVNET]: {
    STABLE:
      '0x096e99cfb6d4443ea673745081d268a00e982652e4b8d836218e4452fd0bdc3d::curves::Stable',
    VOLATILE:
      '0x096e99cfb6d4443ea673745081d268a00e982652e4b8d836218e4452fd0bdc3d::curves::Volatile',
  },
  [Network.TESTNET]: {
    STABLE:
      '0xf7a29e0a883d131f73307e1b730f016c20ca6310baae013c75fa889673d10055::curves::Stable',
    VOLATILE:
      '0xf7a29e0a883d131f73307e1b730f016c20ca6310baae013c75fa889673d10055::curves::Volatile',
  },
};

export const OBJECTS = {
  [Network.DEVNET]: {
    REGISTRY:
      '0x93b0561167d574e5b0d38cc68f11fa392413571563fc572960b3cfc1e5ff5c99',
  },
  [Network.TESTNET]: {
    REGISTRY:
      '0x93b0561167d574e5b0d38cc68f11fa392413571563fc572960b3cfc1e5ff5c99',
  },
};

export const PACKAGES = {
  [Network.DEVNET]: {
    DEX: '0x096e99cfb6d4443ea673745081d268a00e982652e4b8d836218e4452fd0bdc3d',
    UTILS: '0xddc7d7d9f7f46edcfde063ac363deeb2d181ac9219222e5079cfb579b26b12a6',
    AIRDROP:
      '0x835a7b92f4efee71b5546e42d6983dfc81a1b06ab18e1517d604e0467884f354',
  },
  [Network.TESTNET]: {
    DEX: '0x096e99cfb6d4443ea673745081d268a00e982652e4b8d836218e4452fd0bdc3d',
    UTILS: '0xddc7d7d9f7f46edcfde063ac363deeb2d181ac9219222e5079cfb579b26b12a6',
    AIRDROP:
      '0x835a7b92f4efee71b5546e42d6983dfc81a1b06ab18e1517d604e0467884f354',
  },
};
