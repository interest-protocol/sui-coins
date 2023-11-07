import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { CircleSVG } from '@/svg';

import { OptionItemProps } from './menu-option.types';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const OptionItem: FC<PropsWithChildren<OptionItemProps>> = ({
  onClick,
  disabled,
  children,
  selected,
}) => {
  return (
    <Motion
      p="m"
      onClick={onClick}
      variants={itemVariants}
      initial={itemVariants.closed}
      nHover={{
        bg: disabled ? 'unset' : 'rgba(0, 83, 219, 0.08)',
      }}
      display="flex"
      borderBottom="1px solid"
      borderColor="#C6C6CA"
      justifyContent="space-between"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={selected ? 'rgba(0, 83, 219, 0.08)' : 'unset'}
    >
      <Box
        display="flex"
        alignItems="center"
        color="onSurface"
        fontFamily="Satoshi !important"
        fontWeight="500"
        gap="m"
        width="100%"
      >
        {children}
      </Box>
      {selected && (
        <Box color="primary">
          <CircleSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      )}
    </Motion>
  );
};

export default OptionItem;
