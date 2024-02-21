import { Routes, RoutesEnum } from '@/constants';
import { AirdropSVG, CirclePlusSVG, DotsSVG, DoubleChevronSVG } from '@/svg';

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
    name: 'More',
    path: '#',
    disabled: false,
    accordionList: [
      {
        name: 'My Coins',
        path: Routes[RoutesEnum.MyCoins],
        disabled: false,
      },
      {
        name: 'Faucet',
        path: Routes[RoutesEnum.Faucet],
        disabled: false,
      },
    ],
  },
];
