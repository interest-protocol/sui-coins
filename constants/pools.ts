import { PoolCardProps } from '@/views/pools/pool-card/pool-card.types';

import { COIN_TYPE, COINS } from './coins';
import { Network } from './dapp';

const networkTestNetCoins = COINS[Network.TESTNET];
const networkMainNetCoins = COINS[Network.MAINNET];

export const COIN_POOL = {
  [Network.TESTNET]: {
    V_LP_SUI_ETH:
      '0x1e1e6373b648f604706c387c579626dc8dd145f9f4cea878f7b16e259c31bb5c',
    V_LP_BTC_ETH:
      '0xacf1a6af31efaae5e95dbc8e34fc91f8039b08708448ef8866f787fa43603b67',
    V_LP_BNB_ETH:
      '0x0ee8994563b3bd7d029641ca1d097dc53464d87cbf179c4e6fb5e7c23baf9209',
    V_LP_ETH_USDT:
      '0x8a28f9789f61d84398a5f2e66ac759a784f437c6b14c7b5cbc3d712528c3fb7b',
    V_LP_ETH_USDC:
      '0x2b8dda430b7cfa52482cde2d84390bf0496cf95c4a40579faa08479cfa381b81',
    S_LP_USDC_USDT:
      '0xb4196e35125f821ef22237e7991233ffc83c1fae1781f113967f04d18d9d7645',
  },
  [Network.MAINNET]: {
    S_LP_ETH_WORMHOLE_USDC_ETH_WORMHOLE_USDT:
      '0x9b7ef251c98bf6990f70f45bfd012de5308483ae2fa0d8e39f559323baacf9ca',
    V_LP_SUI_NATIVE_WORMHOLE_ETH:
      '0x8f41de61cdc1ee379cadd7889dd588fcab62552e48959d027ba1d8839c027771',
    V_LP_SUI_ETH_WORMHOLE_USDT:
      '0x9fc77859750974b84b931d79acfc7116abde230b5dd2bb164331819561b90771',
    V_LP_SUI_ETH_WORMHOLE_USDC:
      '0x85e87655a47628098b5fc2e62d4926c6384e0430f2eae60cf9c692562b688702',
    V_LP_SUI_NATIVE_WORMHOLE_WBNB:
      '0x8fc0924fda0700bfa3c2a21a71ad02205547673c03bb4c131a6fa15831fec73f',
    V_LP_SUI_NATIVE_WORMHOLE_WMATIC:
      '0x877a542a5e9e8b5b71b5ff62d37774820fbb2230bea3bb9dec76e25e126e6268',
    V_LP_SUI_NATIVE_WORMHOLE_WFTM:
      '0xa8385d3ae4378c610d355085cf01e565ab5c8e3e80d27e32d7b2a93fad7af583',
    V_LP_SUI_NATIVE_WORMHOLE_CELO:
      '0x40ffe408f84b562677cfbdc2a081abc3618642d98d8208675dc42a87589a31dd',
    V_LP_SUI_NATIVE_WORMHOLE_WAVAX:
      '0xfadbbca64245714cbd22f85f0d74cdba0a595e585155a2e2223de6e69400c7d2',
    V_LP_SUI_BSC_WORMHOLE_ADA:
      '0x31186ba7ba3d79e78a21d8282987bae0f78230a755734440bad931a9b06b10f1',
    V_LP_SUI_BSC_WORMHOLE_BTCB:
      '0xd9856ab45adec800dfa7887815422ac8f55607baeeb4a08b86c5d0ebd6ce1ec7',
    V_LP_SUI_BSC_WORMHOLE_USDT:
      '0x7e735695049e3e1e14d86768da12d0465d3b37b797ff6f775bd76225e331d457',
    S_LP_BSC_WORMHOLE_USDT_BSC_WORMHOLE_USDC:
      '0x8f6c873aa5f680390aae092c4c62e7a755d602a6492eefdc02122400cf34f7e2',
    V_LP_SUI_BSC_WORMHOLE_USDC:
      '0xb05544f109fc1f77e4dbdfd1c42ac1585c52f31984371c677c7a47674de2f8b3',
    S_LP_ETH_WORMHOLE_USDC_BSC_WORMHOLE_USDC:
      '0x7ee34a0ffc65c89e07312928291e6a0bcc8628513c6f3faf32cc4b4d0815ba3a',
    V_LP_SUI_BSC_WORMHOLE_FLOKI:
      '0x2d5f55761fd1dfdbb078e8d1ed11e1b6a35e162577e8c09eba1cc656c297b6b7',
    V_LP_SUI_BSC_WORMHOLE_DOGE:
      '0x7fc6556f6dcbdc1e639154eb71d9364f21b0845e944a7c4de7cec11abe1e0554',
    V_LP_SUI_BSC_WORMHOLE_ETH:
      '0x4e66be98b0b6f560d9c9e6ac6845e43a87f7a0f7c22679da992963122616daa8',
    V_LP_SUI_NATIVE_WORMHOLE_SOL:
      '0xb5d8ff88e9093847d2bed1c11faa4884aa56f286e662c58f0e1a424939300a1c',
    V_LP_SUI_ETH_CELER_WETH:
      '0x6506cb8cdd7edac437822881ddfd178ad3a09066d83f505c87999b1e3f595210',
    V_LP_SUI_ETH_CELER_WBTC:
      '0x3604dcc9514a375d0d0a076fdde63ea8890ca59e00d105e52d4de7c32c09b621',
    V_LP_SUI_ETH_CELER_USDC:
      '0x148968a14fae894eb39397802c3dd1173a3851d239f5d71672a22fb5931d3658',
  },
};

const networkTestNetCoinPool = COIN_POOL[Network.TESTNET];
const networkMainNetCoinPool = COIN_POOL[Network.MAINNET];

export const RECOMMENDED_POOLS: Record<
  Network,
  ReadonlyArray<PoolCardProps>
> = {
  [Network.TESTNET]: [
    {
      dex: 'interest',
      token0: networkTestNetCoins.BNB,
      token1: networkTestNetCoins.ETH,
      poolObjectId: networkTestNetCoinPool.V_LP_BNB_ETH,
      lpCoin: networkTestNetCoins.V_LP_BNB_ETH,
      stable: false,
    },
    {
      token0: networkTestNetCoins.BTC,
      dex: 'interest',
      token1: networkTestNetCoins.ETH,
      poolObjectId: networkTestNetCoinPool.V_LP_BTC_ETH,
      lpCoin: networkTestNetCoins.V_LP_BTC_ETH,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkTestNetCoins.ETH,
      token1: networkTestNetCoins.USDT,
      poolObjectId: networkTestNetCoinPool.V_LP_ETH_USDT,
      lpCoin: networkTestNetCoins.V_LP_ETH_USDT,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkTestNetCoins.ETH,
      token1: networkTestNetCoins.USDC,
      poolObjectId: networkTestNetCoinPool.V_LP_ETH_USDC,
      lpCoin: networkTestNetCoins.V_LP_ETH_USDC,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkTestNetCoins.SUI,
      token1: networkTestNetCoins.ETH,
      poolObjectId: networkTestNetCoinPool.V_LP_SUI_ETH,
      lpCoin: networkTestNetCoins.V_LP_SUI_ETH,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkTestNetCoins.USDC,
      token1: networkTestNetCoins.USDT,
      poolObjectId: networkTestNetCoinPool.S_LP_USDC_USDT,
      lpCoin: networkTestNetCoins.S_LP_USDC_USDT,
      stable: true,
    },
  ],
  [Network.MAINNET]: [
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.BSC_WORMHOLE_BTCB,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_BSC_WORMHOLE_BTCB,
      lpCoin: networkMainNetCoins.V_LP_SUI_BSC_WORMHOLE_BTCB,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.NATIVE_WORMHOLE_ETH,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_NATIVE_WORMHOLE_ETH,
      lpCoin: networkMainNetCoins.V_LP_SUI_NATIVE_WORMHOLE_ETH,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.BSC_WORMHOLE_ETH,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_BSC_WORMHOLE_ETH,
      lpCoin: networkMainNetCoins.V_LP_SUI_BSC_WORMHOLE_ETH,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.NATIVE_WORMHOLE_WBNB,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_NATIVE_WORMHOLE_WBNB,
      lpCoin: networkMainNetCoins.V_LP_SUI_NATIVE_WORMHOLE_WBNB,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.ETH_WORMHOLE_USDC,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_ETH_WORMHOLE_USDC,
      lpCoin: networkMainNetCoins.V_LP_SUI_ETH_WORMHOLE_USDC,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.ETH_WORMHOLE_USDT,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_ETH_WORMHOLE_USDT,
      lpCoin: networkMainNetCoins.V_LP_SUI_ETH_WORMHOLE_USDT,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.BSC_WORMHOLE_USDC,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_BSC_WORMHOLE_USDC,
      lpCoin: networkMainNetCoins.V_LP_SUI_BSC_WORMHOLE_USDC,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.BSC_WORMHOLE_USDT,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_BSC_WORMHOLE_USDT,
      lpCoin: networkMainNetCoins.V_LP_SUI_BSC_WORMHOLE_USDT,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.ETH_CELER_WETH,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_ETH_CELER_WETH,
      lpCoin: networkMainNetCoins.V_LP_SUI_ETH_CELER_WETH,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.ETH_CELER_WBTC,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_ETH_CELER_WBTC,
      lpCoin: networkMainNetCoins.V_LP_SUI_ETH_CELER_WBTC,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.ETH_CELER_USDC,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_ETH_CELER_USDC,
      lpCoin: networkMainNetCoins.V_LP_SUI_ETH_CELER_USDC,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.NATIVE_WORMHOLE_SOL,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_NATIVE_WORMHOLE_SOL,
      lpCoin: networkMainNetCoins.V_LP_SUI_NATIVE_WORMHOLE_SOL,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.BSC_WORMHOLE_ADA,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_BSC_WORMHOLE_ADA,
      lpCoin: networkMainNetCoins.V_LP_SUI_BSC_WORMHOLE_ADA,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.NATIVE_WORMHOLE_WMATIC,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_NATIVE_WORMHOLE_WMATIC,
      lpCoin: networkMainNetCoins.V_LP_SUI_NATIVE_WORMHOLE_WMATIC,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.NATIVE_WORMHOLE_WAVAX,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_NATIVE_WORMHOLE_WAVAX,
      lpCoin: networkMainNetCoins.V_LP_SUI_NATIVE_WORMHOLE_WAVAX,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.ETH_WORMHOLE_USDC,
      token1: networkMainNetCoins.BSC_WORMHOLE_USDC,
      poolObjectId:
        networkMainNetCoinPool.S_LP_ETH_WORMHOLE_USDC_BSC_WORMHOLE_USDC,
      lpCoin: networkMainNetCoins.S_LP_ETH_WORMHOLE_USDC_BSC_WORMHOLE_USDC,
      stable: true,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.ETH_WORMHOLE_USDC,
      token1: networkMainNetCoins.ETH_WORMHOLE_USDT,
      poolObjectId:
        networkMainNetCoinPool.S_LP_ETH_WORMHOLE_USDC_ETH_WORMHOLE_USDT,
      lpCoin: networkMainNetCoins.S_LP_ETH_WORMHOLE_USDC_ETH_WORMHOLE_USDT,
      stable: true,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.BSC_WORMHOLE_USDT,
      token1: networkMainNetCoins.BSC_WORMHOLE_USDC,
      poolObjectId:
        networkMainNetCoinPool.S_LP_BSC_WORMHOLE_USDT_BSC_WORMHOLE_USDC,
      lpCoin: networkMainNetCoins.S_LP_BSC_WORMHOLE_USDT_BSC_WORMHOLE_USDC,
      stable: true,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.NATIVE_WORMHOLE_WFTM,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_NATIVE_WORMHOLE_WFTM,
      lpCoin: networkMainNetCoins.V_LP_SUI_NATIVE_WORMHOLE_WFTM,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.NATIVE_WORMHOLE_CELO,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_NATIVE_WORMHOLE_CELO,
      lpCoin: networkMainNetCoins.V_LP_SUI_NATIVE_WORMHOLE_CELO,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.BSC_WORMHOLE_DOGE,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_BSC_WORMHOLE_DOGE,
      lpCoin: networkMainNetCoins.V_LP_SUI_BSC_WORMHOLE_DOGE,
      stable: false,
    },
    {
      dex: 'interest',
      token0: networkMainNetCoins.SUI,
      token1: networkMainNetCoins.BSC_WORMHOLE_FLOKI,
      poolObjectId: networkMainNetCoinPool.V_LP_SUI_BSC_WORMHOLE_FLOKI,
      lpCoin: networkMainNetCoins.V_LP_SUI_BSC_WORMHOLE_FLOKI,
      stable: false,
    },
  ],
};

export const COIN_POOL_ID_TO_STABLE = {
  [Network.TESTNET]: {
    [COIN_POOL[Network.TESTNET].S_LP_USDC_USDT]: true,
  },
  [Network.MAINNET]: {
    [COIN_POOL[Network.MAINNET].S_LP_BSC_WORMHOLE_USDT_BSC_WORMHOLE_USDC]: true,
    [COIN_POOL[Network.MAINNET].S_LP_ETH_WORMHOLE_USDC_ETH_WORMHOLE_USDT]: true,
    [COIN_POOL[Network.MAINNET].S_LP_ETH_WORMHOLE_USDC_BSC_WORMHOLE_USDC]: true,
  },
};

export const DEX_LP_COIN_TYPE = {
  [Network.TESTNET]:
    '0xd15fcc9307dcf822a6ec40950b8b8331ae2367c4455c568296ed4e1eb8527a75::core::LPCoin<0xd15fcc9307dcf822a6ec40950b8b8331ae2367c4455c568296ed4e1eb8527a75::curve::',
  [Network.MAINNET]:
    '0x5c45d10c26c5fb53bfaff819666da6bc7053d2190dfa29fec311cc666ff1f4b0::core::LPCoin<0x5c45d10c26c5fb53bfaff819666da6bc7053d2190dfa29fec311cc666ff1f4b0::curve::',
};

export const POOL_IDS = {
  [Network.TESTNET]: [
    COIN_POOL[Network.TESTNET].V_LP_SUI_ETH,
    COIN_POOL[Network.TESTNET].V_LP_BTC_ETH,
    COIN_POOL[Network.TESTNET].V_LP_BNB_ETH,
    COIN_POOL[Network.TESTNET].V_LP_ETH_USDC,
    COIN_POOL[Network.TESTNET].V_LP_ETH_USDT,
    COIN_POOL[Network.TESTNET].S_LP_USDC_USDT,
  ],
  [Network.MAINNET]: [
    COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_BTCB,
    COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_ETH,
    COIN_POOL[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_ETH,
    COIN_POOL[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_WBNB,
    COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_USDC,
    COIN_POOL[Network.MAINNET].V_LP_SUI_ETH_WORMHOLE_USDC,
    COIN_POOL[Network.MAINNET].S_LP_BSC_WORMHOLE_USDT_BSC_WORMHOLE_USDC,
    COIN_POOL[Network.MAINNET].S_LP_ETH_WORMHOLE_USDC_BSC_WORMHOLE_USDC,
    COIN_POOL[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_SOL,
    COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_DOGE,
    COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_FLOKI,
    COIN_POOL[Network.MAINNET].S_LP_ETH_WORMHOLE_USDC_ETH_WORMHOLE_USDT,
  ],
};

export const POOL_ID_MAP = {
  [Network.TESTNET]: {
    [COIN_TYPE[Network.TESTNET].V_LP_SUI_ETH]:
      COIN_POOL[Network.TESTNET].V_LP_SUI_ETH,
    [COIN_TYPE[Network.TESTNET].V_LP_BTC_ETH]:
      COIN_POOL[Network.TESTNET].V_LP_BTC_ETH,
    [COIN_TYPE[Network.TESTNET].V_LP_BNB_ETH]:
      COIN_POOL[Network.TESTNET].V_LP_BNB_ETH,
    [COIN_TYPE[Network.TESTNET].V_LP_ETH_USDC]:
      COIN_POOL[Network.TESTNET].V_LP_ETH_USDC,
    [COIN_TYPE[Network.TESTNET].V_LP_ETH_USDT]:
      COIN_POOL[Network.TESTNET].V_LP_ETH_USDT,
    [COIN_TYPE[Network.TESTNET].S_LP_USDC_USDT]:
      COIN_POOL[Network.TESTNET].S_LP_USDC_USDT,
  },
  [Network.MAINNET]: {
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_BTCB]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_BTCB,
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_ETH]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_ETH,
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_ETH]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_ETH,
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_WBNB]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_WBNB,
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_USDC]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_USDC,
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_ETH_WORMHOLE_USDC]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_ETH_WORMHOLE_USDC,
    [COIN_TYPE[Network.MAINNET].S_LP_BSC_WORMHOLE_USDT_BSC_WORMHOLE_USDC]:
      COIN_POOL[Network.MAINNET].S_LP_BSC_WORMHOLE_USDT_BSC_WORMHOLE_USDC,
    [COIN_TYPE[Network.MAINNET].S_LP_ETH_WORMHOLE_USDC_BSC_WORMHOLE_USDC]:
      COIN_POOL[Network.MAINNET].S_LP_ETH_WORMHOLE_USDC_BSC_WORMHOLE_USDC,
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_SOL]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_SOL,
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_DOGE]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_DOGE,
    [COIN_TYPE[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_FLOKI]:
      COIN_POOL[Network.MAINNET].V_LP_SUI_BSC_WORMHOLE_FLOKI,
    [COIN_TYPE[Network.MAINNET].S_LP_ETH_WORMHOLE_USDC_ETH_WORMHOLE_USDT]:
      COIN_POOL[Network.MAINNET].S_LP_ETH_WORMHOLE_USDC_ETH_WORMHOLE_USDT,
  },
};
