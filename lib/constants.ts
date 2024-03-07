import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { ETHSVG, MOVSVG, USDCSVG } from '@/svg';

export enum Network {
  DEVNET = 'm2:devnet',
  TESTNET = 'm2:testnet',
}

/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export enum TOKEN_SYMBOL {
  MOV = 'MOV',
  USDC = 'USDC',
  ETH = 'ETH',
}

export const TOKEN_ICONS: Record<Network, Record<string, FC<SVGProps>>> = {
  [Network.DEVNET]: {
    [TOKEN_SYMBOL.USDC]: USDCSVG,
    [TOKEN_SYMBOL.MOV]: MOVSVG,
    [TOKEN_SYMBOL.ETH]: ETHSVG,
  },
  [Network.TESTNET]: {
    [TOKEN_SYMBOL.MOV]: MOVSVG,
  },
};
