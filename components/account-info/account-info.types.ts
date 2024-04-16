import { WalletAccount } from '@wallet-standard/base';

export interface AvatarProps {
  account?: WalletAccount;
  isLarge?: boolean;
  withNameOrAddress?: boolean;
}

export interface SuiNetworkProps {
  closeDropdown: () => void;
}
