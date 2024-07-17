import { FC } from 'react';

import { Network } from '@/constants';
import { BTCSVG, ETHSVG, MOVESVG, USDCSVG, USDTSVG } from '@/svg';

import { SVGProps } from '../svg/svg.types';

export const TOKEN_ICONS: Record<
  Network,
  Record<string, string | FC<SVGProps>>
> = {
  [Network.TESTNET]: {
    ETH: ETHSVG,
    WETH: ETHSVG,
    BTC: BTCSVG,
    WBTC: BTCSVG,
    USDC: USDCSVG,
    MOVE: MOVESVG,
    USDT: USDTSVG,
    RUCO: '/images/ruco.webp',
  },
  [Network.DEVNET]: {
    ETH: ETHSVG,
    WETH: ETHSVG,
    BTC: BTCSVG,
    WBTC: BTCSVG,
    USDC: USDCSVG,
    MOVE: MOVESVG,
    USDT: USDTSVG,
    RUCO: '/images/ruco.webp',
  },
};
