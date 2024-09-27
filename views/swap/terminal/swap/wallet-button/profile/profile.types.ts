import type { FC } from 'react';

import type { SVGProps } from '@/components/svg/svg.types';

export interface MenuProfileProps {
  isOpen: boolean;
  handleCloseProfile: () => void;
}

export interface ProfileMenuItemProps {
  Icon: FC<SVGProps>;
  hasBorder: boolean;
  disabled?: boolean;
  description: string;
  handleAction: () => void | Promise<void>;
}

export interface MenuSwitchAccountProps {
  isOpen: boolean;
  onBack: () => void;
  handleCloseProfile: () => void;
}

export interface MenuSwitchAccountHeaderProps {
  onBack: () => void;
  handleCloseProfile: () => void;
  size: number;
}

export interface AvatarProps {
  account?: string;
  withNameOrAddress?: boolean;
}
