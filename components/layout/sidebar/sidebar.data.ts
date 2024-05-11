import { Network, Routes, RoutesEnum } from '@/constants';
import {
  AirdropSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  MenuSVG,
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
    name: 'swap',
    disabled: false,
    Icon: DoubleChevronSVG,
    path: Routes[RoutesEnum.Swap],
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    name: 'pool',
    Icon: PoolSVG,
    disabled: true,
    path: Routes[RoutesEnum.Pools],
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    disabled: false,
    Icon: CirclePlusSVG,
    name: 'create token',
    path: Routes[RoutesEnum.CreateCoin],
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    name: 'airdrop',
    disabled: false,
    Icon: AirdropSVG,
    path: Routes[RoutesEnum.Airdrop],
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    name: 'more',
    disabled: false,
    Icon: MenuSVG,
    accordionList: [
      {
        beta: true,
        name: 'zkSend',
        disabled: false,
        path: Routes[RoutesEnum.Send],
        networks: [Network.MAINNET, Network.TESTNET],
      },
      {
        beta: true,
        disabled: false,
        name: 'incinerator',
        path: Routes[RoutesEnum.Incinerator],
        networks: [Network.MAINNET, Network.TESTNET],
      },
    ],
    path: Routes[RoutesEnum.Airdrop],
    networks: [Network.MAINNET, Network.TESTNET],
  },
];
