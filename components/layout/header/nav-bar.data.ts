import { Routes, RoutesEnum } from '@/constants';

import { DeviceMenuType } from './header.types';

export const MENU_ITEMS = [
  {
    mobileOnly: true,
    name: 'Create Coin',
    device: DeviceMenuType.Both,
    path: Routes[RoutesEnum.CreateCoin],
  },
  {
    name: 'Swap',
    mobileOnly: true,
    device: DeviceMenuType.Both,
    path: Routes[RoutesEnum.Swap],
  },
  {
    name: 'Pools',
    mobileOnly: true,
    device: DeviceMenuType.Both,
    path: Routes[RoutesEnum.Pools],
  },
  {
    name: 'My Coins',
    mobileOnly: false,
    device: DeviceMenuType.Mobile,
    path: Routes[RoutesEnum.MyCoins],
  },
  {
    name: 'Airdrop',
    mobileOnly: true,
    device: DeviceMenuType.Mobile,
    path: Routes[RoutesEnum.Airdrop],
  },
  {
    name: 'Settings',
    mobileOnly: false,
    device: DeviceMenuType.Mobile,
    path: Routes[RoutesEnum.Settings],
  },
];
