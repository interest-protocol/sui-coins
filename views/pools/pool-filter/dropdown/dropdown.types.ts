export interface DropdownProps {
  label?: string;
  disabled?: boolean;
  values: ReadonlyArray<string>;
  onSelect: (value: string) => void;
}
