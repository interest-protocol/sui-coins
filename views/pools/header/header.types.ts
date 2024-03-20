import { Dispatch, SetStateAction } from 'react';

import { PoolTabEnum } from '../pools.types';

export interface SearchMobileProps {
  handleClose: () => void;
  showSearchView: boolean;
}

export interface HeaderProps {
  setTab: Dispatch<SetStateAction<PoolTabEnum>>;
  currentTab: PoolTabEnum;
}
