import { Network, Routes, RoutesEnum } from '@/constants';
import {
  AirdropSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  FireSVG,
  HourglassSVG,
  MemechanSVG,
  MenuSVG,
  PoolSVG,
  UploadSVG,
} from '@/svg';

import { IMenuItem } from './sidebar.types';

export const SIDEBAR_ITEMS: ReadonlyArray<IMenuItem> = [
  {
    name: 'trade',
    disabled: false,
    Icon: DoubleChevronSVG,
    accordionList: [
      {
        name: 'swap',
        disabled: false,
        Icon: DoubleChevronSVG,
        path: Routes[RoutesEnum.Swap],
        networks: [Network.MAINNET],
      },
      {
        name: 'dca',
        disabled: false,
        Icon: HourglassSVG,
        path: Routes[RoutesEnum.DCA],
        networks: [Network.MAINNET],
      },
    ],
    networks: [Network.MAINNET],
  },
  {
    name: 'pool',
    Icon: PoolSVG,
    path: Routes[RoutesEnum.Pools],
    networks: [Network.MAINNET],
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
        name: 'zksend',
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
