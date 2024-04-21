import { ReactNode } from 'react';

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
  content: string | number;
}

export interface PoolDetailAccordionItemCoinProps {
  value: string;
  type: string;
  symbol: string;
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
