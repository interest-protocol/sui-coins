import type { Token } from '@interest-protocol/sui-tokens';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';

import { COINS } from './coins';
import { Network } from './dapp';

const DCA_PACKAGE =
  '0xcd79b4f3d61afacdd30632ccdfc05f923b9847d21ba19c7bae9c73e5d860f5b5';

export const FAUCET_COIN_TYPES: Record<string, string> = {
  SUI: SUI_TYPE_ARG,
  USDC: `${DCA_PACKAGE}::usdc::USDC`,
  ETH: `${DCA_PACKAGE}::eth::ETH`,
  BTC: `${DCA_PACKAGE}::btc::BTC`,
  USDT: `${DCA_PACKAGE}::usdt::USDT`,
};

export const TREASURY_CAP_MAP: Record<string, string> = {
  [FAUCET_COIN_TYPES.USDC]:
    '0x59ba3c06c55a80e64551a0f9289d5fee9522778f4d81d5871d15f6d0a7686a87',
  [FAUCET_COIN_TYPES.ETH]:
    '0xc3cea680608424c2d4f618577d2991c7a99bd29a98f58e0be75555858e9c54af',
  [FAUCET_COIN_TYPES.BTC]:
    '0xea65017ca55ad4b46f51c2e0ce9df86a3bcccba33ccbfa51aade38c2c92fa963',
  [FAUCET_COIN_TYPES.USDT]:
    '0x99ee533652462c5f990c193bf502c16429af600d51b7bf774d1e3cf76623cab6',
};

export const FAUCET_AMOUNT: Record<string, string> = {
  [FAUCET_COIN_TYPES.USDC]: '5000000000',
  [FAUCET_COIN_TYPES.ETH]: '5000000000',
  [FAUCET_COIN_TYPES.BTC]: '100000000',
  [FAUCET_COIN_TYPES.USDT]: '7000000000000',
};

export const FAUCET_COINS: Array<Token> = [
  {
    decimals: 9,
    symbol: 'SUI',
    type: FAUCET_COIN_TYPES.SUI as `0x${string}`,
  },
  {
    decimals: 8,
    symbol: 'BTC',
    type: FAUCET_COIN_TYPES.BTC as `0x${string}`,
  },
  {
    decimals: 8,
    symbol: 'ETH',
    type: FAUCET_COIN_TYPES.ETH as `0x${string}`,
  },
  {
    decimals: 6,
    symbol: 'USDC',
    type: FAUCET_COIN_TYPES.USDC as `0x${string}`,
  },
  {
    decimals: 9,
    symbol: 'USDT',
    type: FAUCET_COIN_TYPES.USDT as `0x${string}`,
  },
];

export const DCA_COIN_MAINNET_MOCK: Record<string, Token> = {
  [FAUCET_COIN_TYPES.SUI]: COINS[Network.MAINNET].SUI,
  [FAUCET_COIN_TYPES.USDC]: COINS[Network.MAINNET].ETH_WORMHOLE_USDC,
  [FAUCET_COIN_TYPES.ETH]: COINS[Network.MAINNET].NATIVE_WORMHOLE_ETH,
  [FAUCET_COIN_TYPES.BTC]: COINS[Network.MAINNET].NATIVE_WORMHOLE_WBTC,
  [FAUCET_COIN_TYPES.USDT]: COINS[Network.MAINNET].ETH_WORMHOLE_USDT,
};

export const DCA_COIN_MAINNET_VALUE: Record<string, number> = {
  [FAUCET_COIN_TYPES.SUI]: 1,
  [FAUCET_COIN_TYPES.USDC]: 1,
  [FAUCET_COIN_TYPES.ETH]: 0.1,
  [FAUCET_COIN_TYPES.BTC]: 0.000001,
  [FAUCET_COIN_TYPES.USDT]: 1,
};
