import { Motion } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Network } from '@/constants';

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
  const { network } = useSuiClientContext();

  if (!accordionList || !accordionList.length) return null;

  return (
    <Motion overflow="hidden" variants={variants}>
      {accordionList
        .filter(({ networks }) => networks.includes(network as Network))
        .map((item) => (
          <AccordionItem key={v4()} {...item} />
        ))}
    </Motion>
  );
};

export default MenuItemCollapsible;
