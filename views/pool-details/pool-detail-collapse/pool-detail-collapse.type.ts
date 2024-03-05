import { ReactNode } from 'react';

export interface PoolDetailCollapseProps {
  title: string;
  children: ReactNode;
}

export interface PoolDetailsCollapseItemStandardProps {
  label: string;
  content: string | number;
  hasAddtionalInfo?: boolean;
  isCopyClipBoard?: boolean;
}

export interface PoolDetailsCollapseItem {
  label: string;
  info: number | string;
  additionalInfo?: boolean;
  clipBoard?: boolean;
}

export interface PoolDetailsCollapseData {
  title: string;
  data: Array<PoolDetailsCollapseItem>;
}
