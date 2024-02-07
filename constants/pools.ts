import { PoolCardProps } from '@/views/pools/pool-card/pool-card.types';

import { COIN_POOL, COINS } from '../views/pools/coins';
import { Network } from '.';

const networkTestNetCoins = COINS[Network.TESTNET];
const networkMainNetCoins = COINS[Network.MAINNET];

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
