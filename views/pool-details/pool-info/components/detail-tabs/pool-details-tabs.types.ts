import { ReactNode } from 'react';

export interface DetaiTabItemProps {
  item: ReactNode;
  isSelected: boolean;
  onChange: () => void;
}

export interface DetaiTabsProps {
  defaultTabIndex?: number;
  items: ReadonlyArray<ReactNode>;
  onChangeTab?: (tabIndex: number) => void;
}
