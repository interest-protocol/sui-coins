import { Network, Routes, RoutesEnum } from '@/constants';
import {
  AirdropSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  PoolSVG,
  TrendUpSVG,
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
    Icon: AirdropSVG,
    name: 'airdrop',
    path: Routes[RoutesEnum.Airdrop],
    disabled: false,
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    Icon: TrendUpSVG,
    name: 'metrics',
    path: Routes[RoutesEnum.Metrics],
    disabled: false,
    networks: [Network.MAINNET, Network.TESTNET],
  },
];
