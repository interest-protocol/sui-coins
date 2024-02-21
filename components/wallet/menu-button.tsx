import { Button, Motion } from '@interest-protocol/ui-kit';
import { AnimatePresence } from 'framer-motion';
import { FC } from 'react';

import { TimesSVG } from '@/svg';

import { MenuButtonProps } from './wallet.types';

const menuVariants = {
  open: {
    rotate: '0deg',
    scaleY: 1,
  },
  closed: {
    rotate: '180deg',
    scaleY: 0,
  },
};

const MenuButton: FC<MenuButtonProps> = ({ handleClose }) => (
  <Button
    isIcon
    variant="text"
    p="0.15rem !important"
    borderRadius="50%"
    bg={['unset', '#FFFFFF1A']}
    onClick={handleClose}
    border={['1px solid', '1px solid', '1px solid', 'none']}
    borderColor="disabled"
  >
    <AnimatePresence initial={false}>
      <Motion
        as="span"
        display="flex"
        alignItems="center"
        justifyContent="center"
        animate={menuVariants.open}
        initial={menuVariants.closed}
        color="onSurface"
      >
        <TimesSVG
          width="100%"
          height="100%"
          maxWidth="0.75rem"
          maxHeight="0.75rem"
        />
      </Motion>
    </AnimatePresence>
  </Button>
);

export default MenuButton;
