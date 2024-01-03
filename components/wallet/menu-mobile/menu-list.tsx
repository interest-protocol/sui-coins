import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SIDEBAR_ITEMS } from '@/components/layout/sidebar/sidebar.data';

import SideBarMenuListItem from './menu-list-item';

const MobileMenuList: FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="s">
      {SIDEBAR_ITEMS.map((item) => (
        <SideBarMenuListItem key={v4()} {...item} />
      ))}
    </Box>
  );
};

export default MobileMenuList;
