import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface MenuMobileProps extends MainMenuMobileProps {
  isOpen?: boolean;
}

export interface MainMenuMobileProps {
  isOpen?: boolean;
  closeMenu: () => void;
}

export interface MenuMobileItemProps {
  name: string;
  path?: string;
  beta?: boolean;
  disabled?: boolean;
  Icon: FC<SVGProps>;
}
