export interface WalletDropdownProps {
  isOpen: boolean;
  loading: boolean;
  handleClose: () => void;
  suiNSRecord: Record<string, string>;
}

export type WalletDropdownWrapperProps = WalletDropdownProps;

export interface WalletItemProps {
  name?: 'disconnect';
}

export interface MenuButtonProps {
  handleClose: () => void;
}
