import { Network, Routes, RoutesEnum } from '@/constants';
import {
  AirdropSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  FireSVG,
  MenuSVG,
  MergeSVG,
  PoolSVG,
  UploadSVG,
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
    path: Routes[RoutesEnum.Pools],
    networks: [Network.MAINNET, Network.TESTNET],
    disabled: true,
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
    Icon: FireSVG,
    disabled: false,
    name: 'incinerator',
    path: Routes[RoutesEnum.Incinerator],
    networks: [Network.MAINNET, Network.TESTNET],
  },
  {
    name: 'more',
    Icon: MenuSVG,
    disabled: false,
    networks: [Network.MAINNET, Network.TESTNET],
    accordionList: [
      {
        beta: false,
        name: 'send',
        disabled: false,
        Icon: UploadSVG,
        path: Routes[RoutesEnum.Send],
        networks: [Network.MAINNET, Network.TESTNET],
      },
      {
        beta: false,
        name: 'merge',
        disabled: false,
        Icon: MergeSVG,
        path: Routes[RoutesEnum.Merge],
        networks: [Network.MAINNET, Network.TESTNET],
      },
    ],
  },
];
