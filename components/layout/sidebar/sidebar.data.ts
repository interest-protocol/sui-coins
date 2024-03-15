import { Network, Routes, RoutesEnum } from '@/constants';
import { AirdropSVG, CirclePlusSVG, DoubleChevronSVG, PoolSVG } from '@/svg';

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
    disabled: false,
    accordionList: [
      {
        name: 'Trade',
        disabled: false,
        path: Routes[RoutesEnum.Swap],
        networks: [Network.MAINNET, Network.TESTNET],
      },
      {
        name: 'DCA',
        disabled: false,
        path: Routes[RoutesEnum.DCA],
        networks: [Network.MAINNET, Network.TESTNET],
      },
    ],
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    Icon: PoolSVG,
    name: 'pool',
    path: Routes[RoutesEnum.Pools],
    disabled: true,
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    Icon: CirclePlusSVG,
    name: 'create token',
    path: Routes[RoutesEnum.CreateCoin],
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
];
