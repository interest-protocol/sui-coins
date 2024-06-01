export interface MenuMobileProps extends MainMenuMobileProps {
  isOpen?: boolean;
}

export interface MainMenuMobileProps {
  isOpen?: boolean;
  closeMenu: () => void;
}
