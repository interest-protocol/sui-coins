import { Routes, RoutesEnum } from '@/constants';

import { DeviceMenuType } from './header.types';

export const MENU_ITEMS = [
  {
    name: 'Create Coin',
    path: Routes[RoutesEnum.CreateCoin],
    device: DeviceMenuType.Both,
  },
  {
    name: 'Swap',
    path: Routes[RoutesEnum.Swap],
    device: DeviceMenuType.Both,
  },
  {
    name: 'Pools',
    path: Routes[RoutesEnum.Pools],
    device: DeviceMenuType.Both,
  },
  {
    name: 'My Coins',
    path: Routes[RoutesEnum.MyCoins],
    device: DeviceMenuType.Mobile,
  },
  {
    name: 'Airdrop',
    path: Routes[RoutesEnum.Airdrop],
    device: DeviceMenuType.Mobile,
  },
  {
    name: 'Create Pool',
    path: Routes[RoutesEnum.CreatePool],
  },
];
