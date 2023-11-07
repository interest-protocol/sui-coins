export interface OptionItemProps {
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export interface MenuOptionsProps {
  isMenuOpen: boolean;
  handleDisconnect: () => void;
}
