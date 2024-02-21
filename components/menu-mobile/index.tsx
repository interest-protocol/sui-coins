import { Box, Button, Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { MenuSVG } from '@/svg';

import MainMenu from './main-menu';

const MenuMobile: FC = () => {
  const { colors } = useTheme() as Theme;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => setIsOpen(true);

  const handleCloseMenu = () => setIsOpen(false);

  return (
    <Box>
      <Button
        isIcon
        p="2xs"
        gap="xs"
        variant="text"
        color="onSurface"
        border="1px solid"
        borderRadius="full"
        borderColor="onSurface"
        bg={isOpen ? `${colors.primary}14` : 'transparent'}
        onClick={handleOpenMenu}
      >
        <MenuSVG maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      </Button>
      {isOpen && (
        <Box
          top="0"
          pt="l"
          left="0"
          zIndex={4}
          width="100vw"
          height="100vh"
          overflowY="auto"
          position="fixed"
          bg="container"
          display={['block', 'block', 'block', 'none']}
        >
          <MainMenu closeMenu={handleCloseMenu} />
        </Box>
      )}
    </Box>
  );
};

export default MenuMobile;
