import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { DexName } from '@/constants/pools';
import { IPXRoundedSVG, LogoSVG } from '@/svg';

import { PoolCardHeaderTagProps } from './pool-card.types';

export const LINES = [
  {
    description: 'Fee',
    amount: '000',
    tooltipInfo: 'Fee per transaction',
  },
  {
    description: 'Liquidity',
    amount: '234.566',
    tooltipInfo: 'Liquidity',
  },
  {
    description: 'Volume (24)',
    amount: '234.88',
    tooltipInfo: 'Volume',
  },
];

export const POOL_CARD_TAGS: Record<
  DexName,
  ReadonlyArray<PoolCardHeaderTagProps>
> = {
  [DexName.Interest]: [
    {
      name: 'CLAMM',
      url: 'https://interestprotocol.com',
    },
    {
      name: 'Volatile',
      url: 'https://interestprotocol.com',
    },
  ],
  [DexName.Suicoins]: [
    {
      name: 'CLAMM',
      url: 'https://interestprotocol.com',
    },
    {
      name: 'Volatile',
      url: 'https://interestprotocol.com',
    },
  ],
};

export const DEX_MAP: Record<
  DexName,
  {
    name: string;
    Icon: FC<SVGProps>;
    url: string;
    tags?: ReadonlyArray<PoolCardHeaderTagProps>;
  }
> = {
  [DexName.Interest]: {
    name: 'Interest',
    Icon: IPXRoundedSVG,
    tags: POOL_CARD_TAGS[DexName.Interest],
    url: 'https://interestprotocol.com',
  },
  [DexName.Suicoins]: {
    name: 'Suicoins',
    Icon: LogoSVG,
    url: 'https://Suicoins.com',
  },
};
