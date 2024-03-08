import { Network } from '@/lib';

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
};
