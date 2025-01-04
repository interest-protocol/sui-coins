import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { Explorer } from '@/constants';
import { RpcEnum } from '@/constants/rpc';

export interface MenuProfileProps {
  isOpen: boolean;
  handleOpenSwitch: () => void;
  handleOpenRPC: () => void;
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

export interface MenuExplorerProps extends MenuSwitchAccountProps {
  explorer: Explorer;
  handleExplorer: (explorer: Explorer) => void;
}

export interface MenuRPCProps extends MenuSwitchAccountProps {
  rpc: RpcEnum;
  handleRPC: (rpc: RpcEnum) => void;
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
