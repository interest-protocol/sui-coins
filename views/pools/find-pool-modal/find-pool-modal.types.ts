export interface FindPoolModalProps {
  closeModal: () => void;
}

export interface SelectTokenProps {
  index: number;
  canRemove: boolean;
  handleRemoveSelectToken: (index: number) => void;
}
