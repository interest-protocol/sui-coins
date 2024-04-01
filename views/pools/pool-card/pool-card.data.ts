import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { DexName } from '@/constants/pools';
import { IPXRoundedSVG, SuiCoinsSVG } from '@/svg';

export const LINES = [
  {
    description: 'Fee',
    amount: '000%',
    tooltipInfo: 'Fee per transaction',
  },
  {
    description: 'Liquidity',
    amount: '$234.566',
    tooltipInfo: 'Liquidity',
  },
  {
    description: 'Volume (24)',
    amount: '$234.88',
    tooltipInfo: 'Volume',
  },
];

export const DEX_MAP: Record<
  DexName,
  {
    name: string;
    Icon: FC<SVGProps>;
    url: string;
  }
> = {
  [DexName.Interest]: {
    name: 'Interest',
    Icon: IPXRoundedSVG,
    url: 'https://interestprotocol.com',
  },
  [DexName.Suicoins]: {
    name: 'Sui Coins',
    Icon: SuiCoinsSVG,
    url: 'https://suicoins.com',
  },
};
