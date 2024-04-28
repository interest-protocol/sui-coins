import type { ReactNode } from 'react';

export interface SelectTypeCardProps {
  title: string;
  disabled?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  description: string;
  illustration: ReactNode;
}
