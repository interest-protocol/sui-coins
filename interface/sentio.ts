import { MAINNET_BASE_COINS } from '@/constants';

export enum Bridge {
  Celer = 'Celer',
  Wormhole = 'Wormhole',
}

export enum Chain {
  ETH = 'ETH',
  BSC = 'BSC',
  FTM = 'FTM',
  AVAX = 'AVAX',
  CELO = 'CELO',
  SOLANA = 'SOLANA',
  POLYGON = 'POLYGON',
}

export interface CoinInfo {
  symbol: string;
  name: string;
  decimals: number;
  type: string;
  bridge: null | Bridge;
  sourceChain: Chain | null;
}

export const COINS_MAP = {
  [MAINNET_BASE_COINS.SUI]: {
    decimals: 9,
    symbol: 'SUI',
    type: MAINNET_BASE_COINS.SUI,
    name: 'SUI',
    bridge: null,
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_ETH]: {
    decimals: 8,
    symbol: 'ETH',
    type: MAINNET_BASE_COINS.NATIVE_WORMHOLE_ETH,
    name: 'Ether',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.ETH,
  },
  [MAINNET_BASE_COINS.ETH_WORMHOLE_USDC]: {
    decimals: 6,
    symbol: 'USDCeth',
    type: MAINNET_BASE_COINS.ETH_WORMHOLE_USDC,
    name: 'USD Coin',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.ETH,
  },
  [MAINNET_BASE_COINS.ETH_WORMHOLE_USDT]: {
    decimals: 6,
    symbol: 'USDTeth',
    type: MAINNET_BASE_COINS.ETH_WORMHOLE_USDT,
    name: 'USD Tether',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.ETH,
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WBNB]: {
    decimals: 8,
    symbol: 'WBNB',
    type: MAINNET_BASE_COINS.NATIVE_WORMHOLE_WBNB,
    name: 'Wrapped BNB',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.BSC,
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_SOL]: {
    decimals: 8,
    symbol: 'SOL',
    type: MAINNET_BASE_COINS.NATIVE_WORMHOLE_SOL,
    name: 'Solana',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.SOLANA,
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WAVAX]: {
    decimals: 8,
    symbol: 'WAVAX',
    type: MAINNET_BASE_COINS.NATIVE_WORMHOLE_WAVAX,
    name: 'Wrapped AVAX',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.AVAX,
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WFTM]: {
    decimals: 8,
    symbol: 'WFTM',
    type: MAINNET_BASE_COINS.NATIVE_WORMHOLE_WFTM,
    name: 'Wrapped FTW',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.FTM,
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_CELO]: {
    decimals: 8,
    symbol: 'CELO',
    type: MAINNET_BASE_COINS.NATIVE_WORMHOLE_CELO,
    name: 'CELO',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.CELO,
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WMATIC]: {
    decimals: 8,
    symbol: 'WMATIC',
    type: MAINNET_BASE_COINS.NATIVE_WORMHOLE_WMATIC,
    name: 'Wrapped Matic',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.POLYGON,
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_ADA]: {
    decimals: 8,
    symbol: 'ADAbnb',
    type: MAINNET_BASE_COINS.BSC_WORMHOLE_ADA,
    name: 'Cardano',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.BSC,
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_BTCB]: {
    decimals: 8,
    symbol: 'WBTCBbnb',
    type: MAINNET_BASE_COINS.BSC_WORMHOLE_BTCB,
    name: 'Wrapped Bitcoin Binance',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.BSC,
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_USDC]: {
    decimals: 8,
    symbol: 'USDCbnb',
    type: MAINNET_BASE_COINS.BSC_WORMHOLE_USDC,
    name: 'USD Coin',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.BSC,
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_USDT]: {
    decimals: 8,
    symbol: 'USDTbnb',
    type: MAINNET_BASE_COINS.BSC_WORMHOLE_USDT,
    name: 'USD Tether',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.BSC,
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_ETH]: {
    decimals: 8,
    symbol: 'WETHbnb',
    type: MAINNET_BASE_COINS.BSC_WORMHOLE_ETH,
    name: 'Wrapped Ether',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.BSC,
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_FLOKI]: {
    decimals: 8,
    symbol: 'FLOKIbnb',
    type: MAINNET_BASE_COINS.BSC_WORMHOLE_FLOKI,
    name: 'FLOKI',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.BSC,
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_DOGE]: {
    decimals: 8,
    symbol: 'DOGEbnb',
    type: MAINNET_BASE_COINS.BSC_WORMHOLE_DOGE,
    name: 'DOGE',
    bridge: Bridge.Wormhole,
    sourceChain: Chain.BSC,
  },
  [MAINNET_BASE_COINS.ETH_CELER_WETH]: {
    decimals: 9,
    symbol: 'cWETHeth',
    type: MAINNET_BASE_COINS.ETH_CELER_WETH,
    name: 'Celer Wrapped Ether',
    bridge: Bridge.Celer,
    sourceChain: Chain.ETH,
  },
  [MAINNET_BASE_COINS.ETH_CELER_WBTC]: {
    decimals: 8,
    symbol: 'cWBTCeth',
    type: MAINNET_BASE_COINS.ETH_CELER_WBTC,
    name: 'Celer Wrapped Bitcoin',
    bridge: Bridge.Celer,
    sourceChain: Chain.ETH,
  },
  [MAINNET_BASE_COINS.ETH_CELER_USDC]: {
    decimals: 6,
    symbol: 'cUSDCeth',
    type: MAINNET_BASE_COINS.ETH_CELER_USDC,
    name: 'Celer USDC',
    bridge: Bridge.Celer,
    sourceChain: Chain.ETH,
  },
  [MAINNET_BASE_COINS.ETH_CELER_USDT]: {
    decimals: 6,
    symbol: 'cUSDTeth',
    type: MAINNET_BASE_COINS.ETH_CELER_USDT,
    name: 'Celer USDT',
    bridge: Bridge.Celer,
    sourceChain: Chain.ETH,
  },
} as Record<string, CoinInfo>;

export const PRICE_MAP = {
  [MAINNET_BASE_COINS.SUI]: MAINNET_BASE_COINS.SUI,
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_ETH]:
    MAINNET_BASE_COINS.NATIVE_WORMHOLE_ETH,
  [MAINNET_BASE_COINS.ETH_WORMHOLE_USDC]: MAINNET_BASE_COINS.ETH_WORMHOLE_USDC,
  [MAINNET_BASE_COINS.ETH_WORMHOLE_USDT]: MAINNET_BASE_COINS.ETH_WORMHOLE_USDT,
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WBNB]:
    MAINNET_BASE_COINS.NATIVE_WORMHOLE_WBNB,
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_SOL]:
    MAINNET_BASE_COINS.NATIVE_WORMHOLE_SOL,
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WAVAX]:
    MAINNET_BASE_COINS.NATIVE_WORMHOLE_WAVAX,
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WFTM]:
    MAINNET_BASE_COINS.NATIVE_WORMHOLE_WFTM,
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_CELO]:
    MAINNET_BASE_COINS.NATIVE_WORMHOLE_CELO,
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WMATIC]:
    MAINNET_BASE_COINS.NATIVE_WORMHOLE_WMATIC,
  [MAINNET_BASE_COINS.BSC_WORMHOLE_ADA]: MAINNET_BASE_COINS.BSC_WORMHOLE_ADA,
  [MAINNET_BASE_COINS.BSC_WORMHOLE_BTCB]: MAINNET_BASE_COINS.BSC_WORMHOLE_BTCB,
  [MAINNET_BASE_COINS.BSC_WORMHOLE_USDC]: MAINNET_BASE_COINS.ETH_WORMHOLE_USDC,
  [MAINNET_BASE_COINS.BSC_WORMHOLE_USDT]: MAINNET_BASE_COINS.ETH_WORMHOLE_USDT,
  [MAINNET_BASE_COINS.BSC_WORMHOLE_ETH]: MAINNET_BASE_COINS.NATIVE_WORMHOLE_ETH,
  [MAINNET_BASE_COINS.BSC_WORMHOLE_FLOKI]:
    MAINNET_BASE_COINS.BSC_WORMHOLE_FLOKI,
  [MAINNET_BASE_COINS.BSC_WORMHOLE_DOGE]: MAINNET_BASE_COINS.BSC_WORMHOLE_DOGE,
  [MAINNET_BASE_COINS.ETH_CELER_WETH]: MAINNET_BASE_COINS.NATIVE_WORMHOLE_ETH,
  [MAINNET_BASE_COINS.ETH_CELER_WBTC]: MAINNET_BASE_COINS.ETH_CELER_WBTC,
  [MAINNET_BASE_COINS.ETH_CELER_USDC]: MAINNET_BASE_COINS.ETH_WORMHOLE_USDC,
  [MAINNET_BASE_COINS.ETH_CELER_USDT]: MAINNET_BASE_COINS.ETH_WORMHOLE_USDT,
};
