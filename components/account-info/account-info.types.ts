import { WalletAccount } from '@wallet-standard/base';

export interface AccountInfoProps {
  menuIsOpen: boolean;
  handleOpenMenu: () => void;
  handleCloseMenu: () => void;
}

export interface AvatarProps {
  account?: WalletAccount;
  withNameOrAddress?: boolean;
}
