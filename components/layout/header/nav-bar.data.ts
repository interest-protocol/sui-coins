import { Routes, RoutesEnum } from '@/constants';

export const MENU_ITEMS = [
  {
    name: 'Create Token',
    path: Routes[RoutesEnum.CreateToken],
    mobileOnly: true,
  },
  {
    name: 'Swap',
    path: Routes[RoutesEnum.Swap],
    mobileOnly: true,
  },
  {
    name: 'Airdrop',
    path: Routes[RoutesEnum.Airdrop],
    mobileOnly: true,
  },
  {
    name: 'My Coins',
    path: Routes[RoutesEnum.MyCoins],
    mobileOnly: false,
  },
  {
    name: 'Faucet',
    path: Routes[RoutesEnum.Faucet],
    mobileOnly: false,
  },
];
