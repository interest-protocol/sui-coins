import { RegistryPool } from '@/interface';

import { COIN_TYPE, COINS } from './coins';
import { Network } from './dapp';

export type TDexSources = 'interest' | 'suicoins';

export const EXCHANGE_FEE = 0.002;

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
    COINS[Network.TESTNET].USDC,
  ],
  [Network.MAINNET]: [
    COINS[Network.MAINNET].SUI,
    COINS[Network.MAINNET].NATIVE_WORMHOLE_ETH,
    COINS[Network.MAINNET].ETH_WORMHOLE_USDC,
  ],
};
