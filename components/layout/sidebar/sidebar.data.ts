import { Routes, RoutesEnum } from '@/constants';
import {
  AirdropSVG,
  CirclePlusSVG,
  DotsSVG,
  DoubleChevronSVG,
  PoolSVG,
} from '@/svg';

import { MenuItemProps } from './sidebar.types';

export const SIDEBAR_ITEMS: ReadonlyArray<
  Omit<
    MenuItemProps,
    'setIsCollapsed' | 'isCollapsed' | 'setTemporarilyOpen' | 'temporarilyOpen'
  >
> = [
  {
    Icon: DoubleChevronSVG,
    name: 'swap',
    path: Routes[RoutesEnum.Swap],
    disabled: false,
  },
  {
    Icon: PoolSVG,
    name: 'Pool',
    path: Routes[RoutesEnum.Pools],
    disabled: false,
  },
  {
    Icon: CirclePlusSVG,
    name: 'create token',
    path: Routes[RoutesEnum.CreateToken],
    disabled: false,
  },
  {
    Icon: AirdropSVG,
    name: 'airdrop',
    path: Routes[RoutesEnum.Airdrop],
    disabled: false,
  },
  {
    Icon: DotsSVG,
    name: 'Faucet',
    path: Routes[RoutesEnum.Faucet],
    disabled: false,
  },
];
