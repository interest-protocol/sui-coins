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
    BTC: BTCSVG,
    USDC: USDCSVG,
    MOVE: MOVESVG,
    USDT: USDTSVG,
  },
  [Network.DEVNET]: {
    ETH: ETHSVG,
    BTC: BTCSVG,
    USDC: USDCSVG,
    MOVE: MOVESVG,
    USDT: USDTSVG,
  },
};
