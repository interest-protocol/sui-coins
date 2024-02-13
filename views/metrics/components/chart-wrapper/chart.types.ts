export interface ChartHeaderProps {
  title: string;
  resume?: {
    amount: string;
    description: string;
  };
  filters?: ReadonlyArray<ChartFilterHeaderProps>;
  isLoading?: boolean;
}

export interface ChartFilterHeaderProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}
