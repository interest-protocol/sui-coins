import type { ReactNode } from 'react';

export interface SendSelectTypeCardProps {
  title: string;
  description: string;
  onSelect: () => void;
  illustration: ReactNode;
}
