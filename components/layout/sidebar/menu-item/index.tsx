import { Motion } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { MenuItemProps } from '../sidebar.types';
import MenuItemCollapsible from './menu-item-collapsible';
import MenuItemTitle from './menu-item-title';

const SidebarMenuItem: FC<MenuItemProps> = ({
  isCollapsed,
  accordionList,
  setTemporarilyOpen,
  ...props
}) => {
  const [isHover, setIsHover] = useState(false);

  const onMouseOver = () => {
    if (isHover) return;

    setIsHover(true);
  };

  const onMouseEnter = () => {
    if (!accordionList) return;
    setIsHover(true);
    setTemporarilyOpen((temporarilyOpen) =>
      isCollapsed ? true : temporarilyOpen
    );
  };

  const onMouseLeave = () => {
    if (!accordionList) return;

    setIsHover(false);
    setTemporarilyOpen(false);
  };

  return (
    <Motion
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...(!accordionList
        ? {
            initial: 'rest',
            whileHover: 'hover',
          }
        : {
            onMouseOver,
            initial: isHover ? 'rest' : 'hover',
            animate: isHover ? 'hover' : 'rest',
          })}
    >
      <MenuItemTitle
        {...props}
        isCollapsed={isCollapsed}
        accordionList={accordionList}
      />
      <MenuItemCollapsible accordionList={accordionList} />
    </Motion>
  );
};

export default SidebarMenuItem;
