import type { ReactNode } from 'react';

export interface PoolDetailAccordionProps {
  title: string;
  noBorder?: boolean;
  children: ReactNode;
}

export interface PoolDetailAccordionItemData {
  label: string;
  popupInfo?: string;
  labelColor?: string;
  isCopyClipBoard?: boolean;
}
export interface PoolDetailAccordionItemStandardProps
  extends PoolDetailAccordionItemData {
  loading: boolean;
  content: string | number;
}

export interface PoolDetailAccordionItemCoinProps {
  type: string;
  value: string;
  symbol: string;
  coinName: string;
  conversion?: string;
  percentage?: string;
}

export interface PoolDetailAccordionData {
  title: string;
  total?: string;
  data:
    | Array<PoolDetailAccordionItemData>
    | Array<PoolDetailAccordionItemCoinProps>;
}
