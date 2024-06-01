import { ReactNode } from 'react';

export interface DetailsTabItemProps {
  item: ReactNode;
  onChange: () => void;
}

export interface DetailsTabsProps {
  defaultTabIndex?: number;
  items: ReadonlyArray<ReactNode>;
  onChangeTab?: (tabIndex: number) => void;
}
