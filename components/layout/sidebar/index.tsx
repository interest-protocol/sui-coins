import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useIsMounted, useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';

import SidebarMenuList from './menu-list';
import SidebarCollapseButton from './sidebar-collapse-button';
import SidebarHeader from './sidebar-logo';

const itemVariants = {
  open: {
    width: '20rem',
  },
  closed: {
    width: '6rem',
  },
};

const Sidebar: FC = () => {
  const isMounted = useIsMounted();
  const isLocalCollapsed = useReadLocalStorage<boolean>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-menu-collapse`
  );

  const [open, setTemporarilyOpen] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(isLocalCollapsed ?? false);

  return (
    <Motion
      p="xl"
      pb="0"
      maxHeight="100vh"
      position="relative"
      flexDirection="column"
      borderRight="1px solid"
      variants={itemVariants}
      borderColor="outlineVariant"
      justifyContent="space-between"
      transition={{ duration: 0.5 }}
      display={['none', 'none', 'none', 'flex']}
      animate={open || !isCollapsed ? 'open' : 'closed'}
      initial={(open || !isCollapsed) === isMounted() ? 'closed' : 'open'}
    >
      <Box>
        <SidebarHeader isCollapsed={!open && isCollapsed} />
        <SidebarMenuList
          open={open}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={!open && isCollapsed}
          setTemporarilyOpen={setTemporarilyOpen}
        />
      </Box>
      <SidebarCollapseButton
        isOpen={!!open}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </Motion>
  );
};

export default Sidebar;
