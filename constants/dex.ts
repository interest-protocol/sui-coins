import { RegistryPool } from '@/interface';

import { Network } from '.';
import { COIN_TYPE, COINS, POOL_ID_MAP } from './coins';

export type TDexSources = 'interest' | 'suicoins';

export const DEX_BASE_COINS = {
  [Network.TESTNET]: [COIN_TYPE[Network.TESTNET].ETH],
  [Network.MAINNET]: [
    COIN_TYPE[Network.MAINNET].SUI,
    COIN_TYPE[Network.MAINNET].ETH_WORMHOLE_USDC,
    COIN_TYPE[Network.MAINNET].BSC_WORMHOLE_USDC,
  ],
};

export const DEX_MAIN_TOKENS = {
  [Network.TESTNET]: [
    COINS[Network.TESTNET].SUI,
    COINS[Network.TESTNET].ETH,
    COINS[Network.TESTNET].BNB,
    COINS[Network.TESTNET].USDC,
  ],
  [Network.MAINNET]: [
    COINS[Network.MAINNET].SUI,
    COINS[Network.MAINNET].NATIVE_WORMHOLE_ETH,
    COINS[Network.MAINNET].NATIVE_WORMHOLE_WBNB,
    COINS[Network.MAINNET].NATIVE_WORMHOLE_WAVAX,
  ],
};

export const REGISTRY_POOLS: Record<
  Network,
  Record<string, Record<string, RegistryPool>>
> = {
  [Network.TESTNET]: {
    [COIN_TYPE[Network.TESTNET].ETH]: {
      [COIN_TYPE[Network.TESTNET].SUI]: {
        poolId: POOL_ID_MAP[Network.TESTNET].V_LP_SUI_ETH,
        lpCoinType: COIN_TYPE[Network.TESTNET].V_LP_SUI_ETH,
      },
      [COIN_TYPE[Network.TESTNET].USDC]: {
        poolId: POOL_ID_MAP[Network.TESTNET].V_LP_ETH_USDC,
        lpCoinType: COIN_TYPE[Network.TESTNET].V_LP_ETH_USDC,
      },
    },
    [COIN_TYPE[Network.TESTNET].USDC]: {
      [COIN_TYPE[Network.TESTNET].ETH]: {
        poolId: POOL_ID_MAP[Network.TESTNET].V_LP_ETH_USDC,
        lpCoinType: COIN_TYPE[Network.TESTNET].V_LP_ETH_USDC,
      },
    },
    [COIN_TYPE[Network.TESTNET].SUI]: {
      [COIN_TYPE[Network.TESTNET].ETH]: {
        poolId: POOL_ID_MAP[Network.TESTNET].V_LP_SUI_ETH,
        lpCoinType: COIN_TYPE[Network.TESTNET].V_LP_SUI_ETH,
      },
    },
  },
  [Network.MAINNET]: {
    [COIN_TYPE[Network.MAINNET].SUI]: {
      [COIN_TYPE[Network.MAINNET].NATIVE_WORMHOLE_ETH]: {
        poolId: POOL_ID_MAP[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_ETH,
        lpCoinType: COIN_TYPE[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_ETH,
      },
      [COIN_TYPE[Network.MAINNET].ETH_WORMHOLE_USDC]: {
        poolId: POOL_ID_MAP[Network.MAINNET].V_LP_SUI_ETH_WORMHOLE_USDC,
        lpCoinType: COIN_TYPE[Network.MAINNET].V_LP_SUI_ETH_WORMHOLE_USDC,
      },
    },
    [COIN_TYPE[Network.MAINNET].ETH_WORMHOLE_USDC]: {
      [COIN_TYPE[Network.MAINNET].SUI]: {
        poolId: POOL_ID_MAP[Network.MAINNET].V_LP_SUI_ETH_WORMHOLE_USDC,
        lpCoinType: COIN_TYPE[Network.MAINNET].V_LP_SUI_ETH_WORMHOLE_USDC,
      },
    },
    [COIN_TYPE[Network.MAINNET].NATIVE_WORMHOLE_ETH]: {
      [COIN_TYPE[Network.MAINNET].SUI]: {
        poolId: POOL_ID_MAP[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_ETH,
        lpCoinType: COIN_TYPE[Network.MAINNET].V_LP_SUI_NATIVE_WORMHOLE_ETH,
      },
    },
  },
};
