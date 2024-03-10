import { FC, ReactNode } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface PoolDetailAccordionProps {
  title: string;
  children: ReactNode;
}

export interface PoolDetailAccordionItemStandardProps {
  label: string;
  labelColor?: string;
  content: string | number;
  popupInfo?: string;
  isCopyClipBoard?: boolean;
}

export interface PoolDetailAccordionItemCoinProps {
  value: string;
  coinName: string;
  Icon?: FC<SVGProps>;
  conversion?: string;
  percentage?: string;
}

export interface PoolDetailAccordionData {
  title: string;
  total?: string;
  data:
    | Array<PoolDetailAccordionItemStandardProps>
    | Array<PoolDetailAccordionItemCoinProps>;
}
