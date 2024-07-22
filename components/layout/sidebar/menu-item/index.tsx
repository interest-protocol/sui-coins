import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { MenuItemProps } from '../sidebar.types';
import MenuItemCollapsible from './menu-item-collapsible';
import MenuItemTitle from './menu-item-title';

const SidebarMenuItem: FC<MenuItemProps> = ({
  open,
  isCollapsed,
  accordionList,
  setTemporarilyOpen,
  ...props
}) => {
  const onMouseEnter = () => {
    if (!accordionList) return;

    setTemporarilyOpen((temporarilyOpen) =>
      isCollapsed ? props.name : temporarilyOpen
    );
  };

  const onMouseLeave = () => {
    if (!accordionList) return;

    setTemporarilyOpen(null);
  };

  return (
    <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Motion
        initial="rest"
        whileHover="hover"
        animate={props.name === open && accordionList ? 'hover' : 'rest'}
      >
        <MenuItemTitle
          {...props}
          isCollapsed={isCollapsed}
          accordionList={accordionList}
        />
        <MenuItemCollapsible accordionList={accordionList} />
      </Motion>
    </Box>
  );
};

export default SidebarMenuItem;
