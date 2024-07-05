import { Network, Routes, RoutesEnum } from '@/constants';
import {
  AirdropSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  FireSVG,
  MemechanSVG,
  MenuSVG,
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
    name: 'Trade',
    disabled: false,
    Icon: DoubleChevronSVG,
    accordionList: [
      {
        name: 'Swap',
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
        beta: true,
        name: 'zkSend',
        disabled: false,
        Icon: UploadSVG,
        path: Routes[RoutesEnum.Send],
        networks: [Network.MAINNET, Network.TESTNET],
      },
      {
        disabled: false,
        name: 'memechan',
        Icon: MemechanSVG,
        networks: [Network.MAINNET],
        path: 'https://sui.memechan.gg',
      },
    ],
  },
];
