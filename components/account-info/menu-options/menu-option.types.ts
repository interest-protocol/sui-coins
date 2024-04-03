export interface OptionItemProps {
  index?: number;
  selected?: boolean;
  disabled?: boolean;
  totalItems?: number;
  onClick?: () => void;
  mobileOnly?: boolean;
  withSubmenu?: boolean;
  withBorderTop?: boolean;
}

export interface MenuOptionsProps {
  isMenuOpen: boolean;
  handleDisconnect: () => void;
}
