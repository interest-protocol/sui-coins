import { ChartSVG, PoolSVG, USDSVG } from '@/svg';

export const TOP_INFO_CARDS_DATA = [
  {
    money: true,
    Icon: USDSVG,
    description: 'TVL',
  },
  {
    money: false,
    Icon: PoolSVG,
    description: 'Pools',
  },
  {
    money: true,
    Icon: ChartSVG,
    description: 'Daily Trading Volume',
  },
];
