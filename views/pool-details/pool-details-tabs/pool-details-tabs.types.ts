import { ReactNode } from 'react';

export interface PoolDetailsTabsItemProps {
  item: ReactNode;
  isSelected: boolean;
  onChange: () => void;
}

export interface PoolDetailsTabsProps {
  defaultTabIndex?: number;
  items: ReadonlyArray<ReactNode>;
  onChangeTab?: (tabIndex: number) => void;
}
