import {
  ActivitySVG,
  AssetsSVG,
  LinkSVG,
  LogoutSVG,
  SwitchSVG,
} from '@/components/svg';

import { ProfileMenuItemProps } from '../profile.types';

export const MENU_PROFILE_DATA: ReadonlyArray<ProfileMenuItemProps> = [
  {
    name: 'activity',
    description: 'activity',
    Icon: ActivitySVG,
    hasBorder: false,
    disabled: true,
  },
  {
    name: 'mycoins',
    description: 'my coins',
    Icon: AssetsSVG,
    hasBorder: false,
    disabled: false,
  },
  {
    name: 'viewInExplorer',
    description: 'View in explorer',
    Icon: LinkSVG,
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
    name: 'disconnect',
    description: 'disconnect',
    Icon: LogoutSVG,
    hasBorder: true,
    disabled: false,
  },
];
