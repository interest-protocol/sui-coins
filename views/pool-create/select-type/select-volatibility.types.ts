import type { ReactNode } from 'react';

export interface SelectTypeCardProps {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
  description: string;
  illustration: ReactNode;
}
