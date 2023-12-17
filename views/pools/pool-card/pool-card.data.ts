import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { TDexSources } from '@/constants/dex';
import { IPXSVG, LogoSVG } from '@/svg';

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

export const DEX_MAP: Record<
  TDexSources,
  { name: string; Icon: FC<SVGProps>; url: string }
> = {
  interest: {
    name: 'Interest',
    Icon: IPXSVG,
    url: 'https://interestprotocol.com',
  },
  suicoins: { name: 'SuiCoins', Icon: LogoSVG, url: 'https://suicoins.com' },
};
