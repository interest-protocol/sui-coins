import { Network } from '@/constants/network';

export const OBJECTS = {
  [Network.DEVNET]: {
    REGISTRY:
      '0xa82dfa032afd911aa4a7953d5ecbf6a33f8e2d1b8f0f379667b141933e5c7582',
  },
  [Network.IMOLA_TESTNET]: {
    REGISTRY:
      '0xaa3be47d3edde41e3bf4ad6ddb0ab438cdfb988dd29d7aa878c787d0a3f1190a',
  },
};

export const PACKAGES = {
  [Network.DEVNET]: {
    DEX: '0x6cd108f303c318cdef1bbbf309e23f97ef9648fdc0e2e6a9d2ef2db014f9504c',
    UTILS: '0x46d23d852e4ead896cf91d8d0ef47c147d80355517edd2ef81dac19b7c3248ae',
    AIRDROP:
      '0x35770416e5918031841afa8e9ad2076f2f9e0dd45fa4fc9effd1fdabf4db654b',
  },
  [Network.IMOLA_TESTNET]: {
    DEX: '0xcb6b81f09890a762a782171cc7c1a2f17a42fb662956d6aa5b7d11e05760797f',
    UTILS: '0xcc26884afc8d168fddde2f69f022cd8f2a118e4a94a2d5a7d60b0dd108a3bf31',
    AIRDROP:
      '0xe84e654a5ad196f1d3507174d413467fa635bb1d70ceb218c1c28f7c102dfd41',
  },
};

export const AMM_CURVES = {
  [Network.DEVNET]: {
    STABLE: `${PACKAGES[Network.DEVNET].DEX}::curves::Stable`,
    VOLATILE: `${PACKAGES[Network.DEVNET].DEX}::curves::Volatile`,
  },
  [Network.IMOLA_TESTNET]: {
    STABLE: `${PACKAGES[Network.IMOLA_TESTNET].DEX}::curves::Stable`,
    VOLATILE: `${PACKAGES[Network.IMOLA_TESTNET].DEX}::curves::Volatile`,
  },
};
