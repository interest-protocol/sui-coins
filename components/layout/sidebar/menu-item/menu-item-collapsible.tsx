import { Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { MenuItemCollapsibleProps } from '../sidebar.types';
import AccordionItem from './accordion-item';

const variants = {
  rest: {
    height: '0rem',
  },
  hover: {
    height: 'auto',
  },
};

const MenuItemCollapsible: FC<MenuItemCollapsibleProps> = ({
  accordionList,
}) => {
  if (!accordionList || !accordionList.length) return null;

  return (
    <Motion overflow="hidden" variants={variants}>
      {accordionList.map((item) => (
        <AccordionItem key={v4()} {...item} />
      ))}
    </Motion>
  );
};

export default MenuItemCollapsible;
