import { Box } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Network } from '@/constants';

import SideBarMenuItem from './menu-item';
import { SIDEBAR_ITEMS } from './sidebar.data';
import { MenuListProps } from './sidebar.types';

const SidebarMenuList: FC<MenuListProps> = ({
  isCollapsed,
  setIsCollapsed,
  setTemporarilyOpen,
}) => {
  const { network } = useSuiClientContext();

  return (
    <Box display="flex" flexDirection="column" gap="s">
      {SIDEBAR_ITEMS.filter(({ networks }) =>
        networks.includes(network as Network)
      ).map((item) => (
        <SideBarMenuItem
          {...item}
          key={v4()}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          setTemporarilyOpen={setTemporarilyOpen}
        />
      ))}
    </Box>
  );
};

export default SidebarMenuList;
