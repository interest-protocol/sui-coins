import { PoolTypeEnum } from '../pool-list.types';

export interface SearchMobileProps {
  handleClose: () => void;
  showSearchView: boolean;
}

export interface ActionGroupProps {
  showSearchView: () => void;
  gotoPool: () => void;
}

export interface HeaderProps {
  handleOptionTab: (index: PoolTypeEnum) => void;
  currentOption: PoolTypeEnum;
}
