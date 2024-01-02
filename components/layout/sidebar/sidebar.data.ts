import { Network, Routes, RoutesEnum } from '@/constants';
import {
  AirdropSVG,
  CirclePlusSVG,
  CoinsSVG,
  DoubleChevronSVG,
  PoolSVG,
  StatsArrowUpSVG,
} from '@/svg';

import { MenuItemProps } from './sidebar.types';

export const SIDEBAR_ITEMS: ReadonlyArray<
  Omit<
    MenuItemProps,
    'setIsCollapsed' | 'isCollapsed' | 'setTemporarilyOpen' | 'temporarilyOpen'
  >
> = [
  {
    Icon: CirclePlusSVG,
    name: 'create token',
    path: Routes[RoutesEnum.CreateCoin],
    disabled: false,
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    Icon: DoubleChevronSVG,
    name: 'swap',
    path: Routes[RoutesEnum.Swap],
    disabled: false,
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    Icon: PoolSVG,
    name: 'pool',
    path: Routes[RoutesEnum.Pools],
    disabled: false,
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    Icon: CoinsSVG,
    name: 'My coins',
    path: Routes[RoutesEnum.MyCoins],
    disabled: false,
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    Icon: AirdropSVG,
    name: 'airdrop',
    path: Routes[RoutesEnum.Airdrop],
    disabled: false,
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    Icon: StatsArrowUpSVG,
    name: 'metrics',
    path: Routes[RoutesEnum.Metrics],
    disabled: true,
    networks: [Network.MAINNET],
  },
];
