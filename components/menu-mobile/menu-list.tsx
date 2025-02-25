import { Box } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SIDEBAR_ITEMS } from '@/components/layout/sidebar/sidebar.data';
import { Network } from '@/constants';

import SideBarMenuListItem from './menu-list-item';

const MobileMenuList: FC = () => {
  const { network } = useSuiClientContext();
  return (
    <Box display="flex" flexDirection="column" gap="s">
      {SIDEBAR_ITEMS.filter(({ networks }) =>
        networks.includes(network as Network)
      ).map((item) => (
        <SideBarMenuListItem key={v4()} {...item} />
      ))}
    </Box>
  );
};

export default MobileMenuList;
