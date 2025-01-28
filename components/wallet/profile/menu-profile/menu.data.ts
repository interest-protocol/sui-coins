import { AssetsSVG, GlobeSVG, LogoutSVG, SwitchSVG } from '@/components/svg';

import { ProfileMenuItemProps } from '../profile.types';

export const MENU_PROFILE_DATA: ReadonlyArray<ProfileMenuItemProps> = [
  {
    name: 'changeExplorer',
    description: 'Change explorer',
    Icon: GlobeSVG,
    hasBorder: false,
    disabled: false,
  },
  {
    name: 'switchAccounts',
    description: 'switch accounts',
    Icon: SwitchSVG,
    hasBorder: false,
    disabled: false,
  },
  {
    name: 'switchRPC',
    description: 'switch RPC',
    Icon: AssetsSVG,
    hasBorder: false,
    disabled: false,
  },
  {
    name: 'disconnect',
    description: 'disconnect',
    Icon: LogoutSVG,
    hasBorder: true,
    disabled: false,
  },
];
