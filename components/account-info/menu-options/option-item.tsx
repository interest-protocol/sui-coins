import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { ChevronRightSVG, CircleSVG } from '@/svg';

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
  mobileOnly,
  withSubmenu,
  withBorderTop,
}) => (
  <Motion
    p="m"
    onClick={onClick}
    alignItems="center"
    borderTop="1px solid"
    variants={itemVariants}
    initial={itemVariants.closed}
    justifyContent="space-between"
    cursor={disabled ? 'not-allowed' : 'pointer'}
    bg={selected ? 'rgba(0, 83, 219, 0.08)' : 'unset'}
    borderColor={withBorderTop ? 'outlineVariant' : 'transparent'}
    display={mobileOnly ? ['flex', 'flex', 'flex', 'none'] : 'flex'}
    nHover={{
      bg: disabled ? 'unset' : 'rgba(0, 83, 219, 0.08)',
    }}
  >
    <Box
      gap="m"
      width="100%"
      display="flex"
      fontWeight="500"
      color="onSurface"
      alignItems="center"
      fontFamily="Satoshi !important"
    >
      {children}
    </Box>
    {selected && (
      <Box color="primary">
        <CircleSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
    )}
    {withSubmenu && (
      <Box color="onSurface">
        <ChevronRightSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
    )}
  </Motion>
);

export default OptionItem;
