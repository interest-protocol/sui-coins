import { WalletAccount } from '@wallet-standard/base';

export interface AccountInfoProps {
  menuIsOpen: boolean;
  handleOpenMenu: () => void;
  handleCloseMenu: () => void;
}

export interface AvatarProps {
  isLarge?: boolean;
  account?: WalletAccount;
  withNameOrAddress?: boolean;
}

export interface SuiNetworkProps {
  closeDropdown: () => void;
}
