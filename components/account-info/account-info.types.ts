export interface AccountInfoProps {
  menuIsOpen: boolean;
  handleOpenMenu: () => void;
  handleCloseMenu: () => void;
}

export interface AvatarProps {
  account?: string;
  isLarge?: boolean;
  withNameOrAddress?: boolean;
}
