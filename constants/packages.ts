import { Network } from '@/constants/network';

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
      '0x495a234af878bfac8e5bde34ff3b9745785e87b1b5aea7839c857225ee7f5552',
  },
  [Network.TESTNET]: {
    REGISTRY:
      '0x495a234af878bfac8e5bde34ff3b9745785e87b1b5aea7839c857225ee7f5552',
  },
};

export const PACKAGES = {
  [Network.DEVNET]: {
    COINS: '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700',
    DEX: '0xc3873c6d4d19b86ee0f453d31fbe834a5e456277713760c8843cb09b94fb714c',
    UTILS: '0x14f25744d3ba5dacc01f4b057a7bcd6979100aba5edecc89bfce114b4751edcf',
    AIRDROP:
      '0x7ec60bcb6d7418e874439863814bc25f6ae15a10c4987da2d6d68515dca4e967',
  },
  [Network.TESTNET]: {
    COINS: '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370',
    DEX: '0xc3873c6d4d19b86ee0f453d31fbe834a5e456277713760c8843cb09b94fb714c',
    UTILS: '0x14f25744d3ba5dacc01f4b057a7bcd6979100aba5edecc89bfce114b4751edcf',
    AIRDROP:
      '0x7ec60bcb6d7418e874439863814bc25f6ae15a10c4987da2d6d68515dca4e967',
  },
};
