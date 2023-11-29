export interface ManageSlippageProps {
  handleManageView: () => void;
}

export interface SlippageInfoProps extends ManageSlippageProps {
  isOpen: boolean;
}
