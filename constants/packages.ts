import { Network } from '@/lib';

import { ETH_TYPE, USDC_TYPE } from './coins';

export const MINT_MODULE_NAME_MAP: Record<string, string> = {
  [ETH_TYPE]: 'eth',
  [USDC_TYPE]: 'usdc',
};

export const PACKAGES = {
  [Network.DEVNET]: {
    COINS: '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700',
    DEX: '0xd1c158de9d3b6787c8d0253995b00c359e448b43beec770e97c2bb831c4174d6',
    UTILS: '0x619d50fa116687fab59ee3c0721c977cdfdb27d061e52ea273f45cb5b8dda9b4',
    AIRDROP:
      '0xf8a9f4e21ae7f14749fcd86178ff3605f7eff527a80a379acb1dffda4187bf5f',
  },
};
