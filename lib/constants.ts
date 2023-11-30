import { MovSVG, USDCSVG } from '@/svg';

/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export enum TOKEN_SYMBOL {
  MOV = 'MOV',
  USDC = 'USDC',
}

export const TOKEN_ICONS = {
  [TOKEN_SYMBOL.USDC]: USDCSVG,
  [TOKEN_SYMBOL.MOV]: MovSVG,
};
