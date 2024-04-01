import { ReactNode } from 'react';

export interface FindPoolDialogProps {
  title: string;
  description: string;
  Icon: ReactNode;
  onClose: () => void;
  onCreatePool: () => void;
}
