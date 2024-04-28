export interface RadioFieldProps {
  label: string;
  type: SelectionFieldValues;
  currentValue: SelectionFieldValues;
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
