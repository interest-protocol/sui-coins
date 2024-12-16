import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface MenuProfileProps {
  isOpen: boolean;
  handleOpenSwitch: () => void;
  handleCloseProfile: () => void;
  handleOpenExplorer: () => void;
}

export interface ProfileMenuItemProps {
  name: string;
  description: string;
  Icon: FC<SVGProps>;
  hasBorder: boolean;
  disabled?: boolean;
  handleAction?: Record<string, () => void | Promise<void>>;
}

export interface MenuSwitchAccountProps {
  isOpen: boolean;
  onBack: () => void;
  handleCloseProfile: () => void;
}

export interface MenuExplorerProps {
  isOpen: boolean;
  onBack: () => void;
  explorer: string;
  handleCloseProfile: () => void;
  handleExplorer?: () => void;
}

export interface MenuSwitchAccountHeaderProps {
  onBack: () => void;
  handleCloseProfile: () => void;
  size: number;
}

export interface MenuOptionExplorer {
  onBack: () => void;
  onSelect: () => void;
}
