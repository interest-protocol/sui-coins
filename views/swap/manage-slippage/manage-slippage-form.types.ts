export interface ManageSlippageFormProps extends ManageSlippageProps {
  handleManageView?: () => void;
}

export interface SlippageInfoProps extends ManageSlippageFormProps {
  isOpen: boolean;
}

export interface ManageSlippageProps {
  shortButton?: boolean;
}
