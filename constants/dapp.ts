import { SUI_MAINNET_CHAIN, SUI_TESTNET_CHAIN } from '@mysten/wallet-standard';

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v1';

export enum Network {
  MAINNET = 'sui:mainnet',
  TESTNET = 'sui:testnet',
}

export const DISPLAY_NETWORK = {
  [Network.MAINNET]: 'Mainnet',
  [Network.TESTNET]: 'Testnet',
};

export const INDEXER_URL = 'https://api.indexer.xyz/graphql';

export const EXPLORER_URL = {
  [SUI_MAINNET_CHAIN]: 'https://suiscan.xyz/mainnet',
  [SUI_TESTNET_CHAIN]: 'https://suiscan.xyz/testnet',
} as Record<Network, string>;

export const TREASURY =
  '0xdd224f2287f0b38693555c6077abe85fcb4aa13e355ad54bc167611896b007e6';

export const AIRDROP_SEND_CONTRACT = {
  [SUI_MAINNET_CHAIN]:
    '0x8bd272a53ed81d42c0e325546ecaac3a90dbb0c048a0da1ccd99ef2d607a0898',
  [SUI_TESTNET_CHAIN]:
    '0xfaa73f744aac0e67eab8e4b631dfc69430e329a4b28a87296f6f1f2ab9a3012f',
};

export const TOAST_DURATION = 10000;

// TODO: object ids
export const OBJECT_RECORD: Record<Network, Record<string, `0x${string}`>> = {
  [Network.TESTNET]: {
    DEX_PACKAGE_ID:
      '0xd15fcc9307dcf822a6ec40950b8b8331ae2367c4455c568296ed4e1eb8527a75',
    DEX_POOLS:
      '0x4637ab864aaee41bfa12f0ebf5588d1e91a753f43fe46303f6d93f57d151bd05',
    DEX_CORE_STORAGE:
      '0x065a58d3e0e41717c7d0b08d09928b2251d3f8f8b0d1479f092e15635969b8be',
    DEX_MASTER_CHEF_STORAGE:
      '0xefc82c6a4d8b6d1b2e6421fa7640e0befb14c8f7e862360b948cbff0fbd5fba3',
    DEX_MASTER_CHEF_ACCOUNT_STORAGE:
      '0xdf5cef4c924f0cbd874ff12a2a7aa32673c9f80722fd781cc66fab11bdf155eb',
    DEX_QUOTE_PACKAGE_ID:
      '0xfe3d9d1fbc06b915e9a546b9d38a3e622850fe77cb198f3d8f822f919365a8b9',
    UTILS_PACKAGE_ID:
      '0xfe3d9d1fbc06b915e9a546b9d38a3e622850fe77cb198f3d8f822f919365a8b9',
  },
  [Network.MAINNET]: {
    DEX_PACKAGE_ID:
      '0x5c45d10c26c5fb53bfaff819666da6bc7053d2190dfa29fec311cc666ff1f4b0',
    DEX_POOLS:
      '0x108779144605a44e4b5447118b711f0b17adf6168cc9b08551d33daca58098e3',
    DEX_CORE_STORAGE:
      '0xdf2ee39f28fdf4bc5d5b5dc89926ac121839f8594fa51b2383a14cb99ab25a77',
    DEX_MASTER_CHEF_STORAGE:
      '0xbf3574ae177272809a7ee8f16c68db8fb832d4b10cb5febc477f90baba5ab6dd',
    DEX_MASTER_CHEF_ACCOUNT_STORAGE:
      '0x23fd9726a20709b6f3a59ba676a1d7bfede607ebeb011f888bb33de4f8f44e32',
    DEX_QUOTE_PACKAGE_ID:
      '0xd3f17406b17aa93f634e486a76938532e49f04345e59c3d250c9ebce79a0263f',
    UTILS_PACKAGE_ID:
      '0xd3f17406b17aa93f634e486a76938532e49f04345e59c3d250c9ebce79a0263f',
  },
};

export const VOLATILE = {
  [Network.TESTNET]: `${
    OBJECT_RECORD[Network.TESTNET].DEX_PACKAGE_ID
  }::curve::Volatile`,
  [Network.MAINNET]: `${
    OBJECT_RECORD[Network.MAINNET].DEX_PACKAGE_ID
  }::curve::Volatile`,
};

export const STABLE = {
  [Network.TESTNET]: `${
    OBJECT_RECORD[Network.TESTNET].DEX_PACKAGE_ID
  }::curve::Stable`,
  [Network.MAINNET]: `${
    OBJECT_RECORD[Network.MAINNET].DEX_PACKAGE_ID
  }::curve::Stable`,
};
