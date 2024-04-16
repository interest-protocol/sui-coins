import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

import { MenuItemCollapsibleProps } from '../layout/sidebar/sidebar.types';

export interface MenuMobileProps extends MainMenuMobileProps {
  isOpen?: boolean;
}

export interface MainMenuMobileProps {
  isOpen?: boolean;
  closeMenu: () => void;
}

export interface MenuMobileItemProps extends MenuItemCollapsibleProps {
  name: string;
  path?: string;
  disabled?: boolean;
  Icon: FC<SVGProps>;
  index: number;
}
