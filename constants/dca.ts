import type { Token } from '@interest-protocol/sui-tokens';

import { Network } from './dapp';

export const MAX_U64 = '18446744073709551615';

const DCA_PACKAGE =
  '0xd65cdf8558711ad3a76078ffe0cd099ccd8c007dba5ebef4aa7a0de30e043736';

export const DELEGATEE =
  '0xae67a84ffd814ac5005e2de892be9acb2372712b7ec9605360620e964deb09a4';

export const FAUCET_COIN_TYPES: Record<string, string> = {
  USDC: `${DCA_PACKAGE}::usdc::USDC`,
  ETH: `${DCA_PACKAGE}::eth::ETH`,
  BTC: `${DCA_PACKAGE}::btc::BTC`,
  USDT: `${DCA_PACKAGE}::usdt::USDT`,
};

export const TREASURY_CAP_MAP: Record<string, string> = {
  [FAUCET_COIN_TYPES.USDC]:
    '0xdf212df05a339db636d74a18fcd46ac4735797d1bade45cd8bca532d54a6dba0',
  [FAUCET_COIN_TYPES.ETH]:
    '0x79660173b5435b4690711ac0ecbe8a3bc4505c6de42ea8f9442787943a8ca14b',
  [FAUCET_COIN_TYPES.BTC]:
    '0x83dfea416599fe1b59a274e3ba01607462c6b2118109f001d1a46adbf0728d18',
  [FAUCET_COIN_TYPES.USDT]:
    '0x36e5246357c95fc2f12dfa0bbd5031e1353d6868ee12cb1e83228c9688d58c2e',
};

export const FAUCET_AMOUNT: Record<string, string> = {
  [FAUCET_COIN_TYPES.USDC]: '5000000000',
  [FAUCET_COIN_TYPES.ETH]: '5000000000',
  [FAUCET_COIN_TYPES.BTC]: '100000000',
  [FAUCET_COIN_TYPES.USDT]: '7000000000000',
};

export const FAUCET_COINS: Array<Token> = [
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

export const DCA_COIN_MAINNET_VALUE: Record<string, number> = {
  [FAUCET_COIN_TYPES.USDC]: 1,
  [FAUCET_COIN_TYPES.ETH]: 0.1,
  [FAUCET_COIN_TYPES.BTC]: 0.000001,
  [FAUCET_COIN_TYPES.USDT]: 1,
};

export const SENTINEL_API_URI: Record<Network, string> = {
  [Network.MAINNET]: process.env.NEXT_PUBLIC_MAINNET_SENTINEL_API_URL!,
  [Network.TESTNET]: process.env.NEXT_PUBLIC_TESTNET_SENTINEL_API_URL!,
};
