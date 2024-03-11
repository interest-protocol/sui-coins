import { Network } from '@/constants/network';

import { ETH_TYPE, USDC_TYPE } from './coins';

export const MINT_MODULE_NAME_MAP: Record<string, string> = {
  [ETH_TYPE]: 'eth',
  [USDC_TYPE]: 'usdc',
};

export const PACKAGES = {
  [Network.DEVNET]: {
    COINS: '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700',
    DEX: '0xf7a29e0a883d131f73307e1b730f016c20ca6310baae013c75fa889673d10055',
    UTILS: '0x8a3cb1ff93578b937c4beb5469f204db2bdc63d6a78a39f12905617c665d67fe',
    AIRDROP:
      '0xf8a9f4e21ae7f14749fcd86178ff3605f7eff527a80a379acb1dffda4187bf5f',
  },
  [Network.TESTNET]: {
    COINS: '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370',
    DEX: '0xd1c158de9d3b6787c8d0253995b00c359e448b43beec770e97c2bb831c4174d6',
    UTILS: '0x619d50fa116687fab59ee3c0721c977cdfdb27d061e52ea273f45cb5b8dda9b4',
    AIRDROP:
      '0x5ff1ba9992809c9fad289a67e31f844724f4ada1d806d6b8ce99947f83f81c1d',
  },
};
