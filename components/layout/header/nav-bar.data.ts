import { Routes, RoutesEnum } from '@/constants';

export const MENU_ITEMS = [
  {
    name: 'Create Coin',
    path: Routes[RoutesEnum.CreateCoin],
  },
  {
    name: 'Swap',
    path: Routes[RoutesEnum.Swap],
  },
  {
    name: 'Pools',
    path: Routes[RoutesEnum.Pools],
  },
  {
    name: 'My Coins',
    path: Routes[RoutesEnum.MyCoins],
  },
  {
    name: 'Create Pool',
    path: Routes[RoutesEnum.CreatePool],
  },
];
