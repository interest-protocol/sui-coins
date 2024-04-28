import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { TOKEN_SYMBOL } from '@/constants/coins';
import { Network } from '@/constants/network';
import { ETHSVG, MOVESVG, USDCSVG } from '@/svg';

/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export const TOKEN_ICONS: Record<Network, Record<string, FC<SVGProps>>> = {
  [Network.DEVNET]: {
    [TOKEN_SYMBOL.USDC]: USDCSVG,
    [TOKEN_SYMBOL.MOVE]: MOVESVG,
    [TOKEN_SYMBOL.ETH]: ETHSVG,
    [TOKEN_SYMBOL.SUI]: MOVESVG,
  },
  [Network.TESTNET]: {
    [TOKEN_SYMBOL.MOVE]: MOVESVG,
    [TOKEN_SYMBOL.SUI]: MOVESVG,
  },
};
