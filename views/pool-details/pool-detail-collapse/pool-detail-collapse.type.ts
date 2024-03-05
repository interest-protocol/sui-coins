import { ReactNode } from 'react';

export interface PoolDetailCollapseProps {
  title: string;
  children: ReactNode;
}

export interface PoolDetailsCollapseItemStandardProps {
  label: string;
  content: string | number;
  hasAddtionalInfo?: boolean;
}

export interface PoolDetailsCollapseItem {
  label: string;
  info: number;
  additionalInfo?: boolean;
}

export interface PoolDetailsCollapseData {
  title: string;
  data: Array<PoolDetailsCollapseItem>;
}
