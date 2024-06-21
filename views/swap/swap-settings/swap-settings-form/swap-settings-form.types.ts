export interface ManageSlippageProps {
  noAgg?: boolean;
  handleManageView: () => void;
}

export interface SlippageInfoProps extends ManageSlippageProps {
  isOpen: boolean;
}
