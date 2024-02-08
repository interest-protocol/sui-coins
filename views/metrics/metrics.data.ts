import { ChartSVG, PoolSVG, USDSVG } from '@/svg';

export const TOP_INFO_CARDS_DATA = [
  {
    money: true,
    Icon: USDSVG,
    description: 'metrics.infoCards.tvl',
  },
  {
    money: false,
    Icon: PoolSVG,
    description: 'metrics.infoCards.pools',
  },
  {
    money: true,
    Icon: ChartSVG,
    description: 'metrics.infoCards.dailyTradingVolume',
  },
];
