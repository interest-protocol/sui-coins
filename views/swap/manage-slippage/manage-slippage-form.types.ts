export interface ManageSlippageFormProps {
  handleManageView?: () => void;
}

export interface SlippageInfoProps extends ManageSlippageFormProps {
  isOpen: boolean;
}
