import type { ReactNode } from 'react';

export interface SelectVolatilityCardProps {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
  description: string;
  illustration: ReactNode;
}
