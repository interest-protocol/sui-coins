import { Network } from '@/constants/network';

import { ETH_TYPE, USDC_TYPE } from './coins';

export const AMM_CURVES = {
  [Network.DEVNET]: {
    STABLE:
      '0xf7a29e0a883d131f73307e1b730f016c20ca6310baae013c75fa889673d10055::curves::Stable',
    VOLATILE:
      '0xf7a29e0a883d131f73307e1b730f016c20ca6310baae013c75fa889673d10055::curves::Volatile',
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
      '0xc78ccb4a0e97102699c10015858da1ab0a79c3d862055e6404cf5b18db9ef282',
  },
  [Network.TESTNET]: {
    REGISTRY:
      '0xc78ccb4a0e97102699c10015858da1ab0a79c3d862055e6404cf5b18db9ef282',
  },
};

export const PACKAGES = {
  [Network.DEVNET]: {
    COINS: '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700',
    DEX: '0xf7a29e0a883d131f73307e1b730f016c20ca6310baae013c75fa889673d10055',
    UTILS: '0x8a3cb1ff93578b937c4beb5469f204db2bdc63d6a78a39f12905617c665d67fe',
    AIRDROP:
      '0x7ec60bcb6d7418e874439863814bc25f6ae15a10c4987da2d6d68515dca4e967',
  },
  [Network.TESTNET]: {
    COINS: '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370',
    DEX: '0xd1c158de9d3b6787c8d0253995b00c359e448b43beec770e97c2bb831c4174d6',
    UTILS: '0x619d50fa116687fab59ee3c0721c977cdfdb27d061e52ea273f45cb5b8dda9b4',
    AIRDROP:
      '0x7ec60bcb6d7418e874439863814bc25f6ae15a10c4987da2d6d68515dca4e967',
  },
};
