import {
  AmmIconSVG,
  ClammIconSVG,
  StableIconSVG,
  VolatileIconSVG,
} from '@/svg';

import { FormFilterValue } from './pool-card.types';

export const LINES = [
  {
    description: 'Fee',
    tooltipInfo: 'Fee per transaction',
  },
  {
    description: 'Liquidity',
    tooltipInfo: 'Liquidity',
  },
];

export const HeaderCardTagIcon = {
  ['CLAMM']: ClammIconSVG,
  ['AMM']: AmmIconSVG,
  [FormFilterValue.stable]: VolatileIconSVG,
  [FormFilterValue.volatile]: StableIconSVG,
};
