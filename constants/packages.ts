import { Network } from '@/lib';

import { ETH_TYPE, USDC_TYPE } from './coins';

export const MINT_MODULE_NAME_MAP: Record<string, string> = {
  [ETH_TYPE]: 'eth',
  [USDC_TYPE]: 'usdc',
};

export const PACKAGES = {
  [Network.DEVNET]: {
    COINS: '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370',
    DEX: '0xd1c158de9d3b6787c8d0253995b00c359e448b43beec770e97c2bb831c4174d6',
    UTILS: '0x619d50fa116687fab59ee3c0721c977cdfdb27d061e52ea273f45cb5b8dda9b4',
    AIRDROP:
      '0x8bd272a53ed81d42c0e325546ecaac3a90dbb0c048a0da1ccd99ef2d607a0898',
  },
};
