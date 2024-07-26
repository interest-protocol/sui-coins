import type { ReactNode } from 'react';

import { SendType } from '../../send.data';

export interface SendSelectTypeCardProps {
  title: string;
  description: string;
  onSelect: () => void;
  illustration: ReactNode;
}

export interface SendSelectTypeProps {
  onSelectType: (key: SendType) => void;
}
