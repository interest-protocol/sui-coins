import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { easeInOut } from 'framer-motion';
import { FC } from 'react';

import { CaretUpSVG } from '@/svg';

import { MenuSettingsListHeaderProps } from './menu-settings.types';

const MenuSettingsListHeaderMobile: FC<MenuSettingsListHeaderProps> = ({
  isOpen,
  handleButton,
}) => (
  <Box
    p="xl"
    mt="2xs"
    onClick={handleButton}
    justifyContent="space-between"
    display={['flex', 'flex', 'flex', 'none']}
    borderTop={['1px solid', '1px solid', '1px solid', 'unset']}
    borderTopColor="outlineVariant"
  >
    <Typography variant="title" size="small" color="onSurface">
      Global Settings
    </Typography>
    <Box display="flex" justifyContent="flex-end">
      <Motion
        transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
        display="flex"
        width="1.25rem"
        height="1.25rem"
        whileTap={{
          scale: 0.97,
          transition: { duration: 0.05, ease: easeInOut },
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.05, ease: easeInOut },
        }}
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
        transition={{ duration: 0.5 }}
      >
        <CaretUpSVG
          width="100%"
          height="100%"
          maxWidth="0.469rem"
          maxHeight="0.469rem"
        />
      </Motion>
    </Box>
  </Box>
);

export default MenuSettingsListHeaderMobile;
