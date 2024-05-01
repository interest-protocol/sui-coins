import { FC } from 'react';

import { Network } from '@/constants';
import { ETHSVG, MOVESVG, USDCSVG } from '@/svg';

import { SVGProps } from '../svg/svg.types';

export const TOKEN_ICONS: Record<
  Network,
  Record<string, string | FC<SVGProps>>
> = {
  [Network.TESTNET]: {
    ETH: ETHSVG,
    USDC: USDCSVG,
    MOVE: MOVESVG,
  },
  [Network.DEVNET]: {
    ETH: ETHSVG,
    USDC: USDCSVG,
    MOVE: MOVESVG,
  },
};
