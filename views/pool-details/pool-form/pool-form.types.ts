export interface RadioFieldProps {
  label: string;
  isSelected: boolean;
  type: SelectionFieldValues;
  handleSelect: (newValue: SelectionFieldValues) => void;
}

export interface TokenListProps {
  type: SelectionFieldValues;
}

export enum SelectionFieldValues {
  None,
  OneCoin,
  Balance,
}
