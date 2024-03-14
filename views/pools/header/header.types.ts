import { Dispatch, SetStateAction } from 'react';

import { PoolTabEnum } from '../pools.types';

export interface HeaderProps {
  setTab: Dispatch<SetStateAction<PoolTabEnum>>;
  currentTab: PoolTabEnum;
}
