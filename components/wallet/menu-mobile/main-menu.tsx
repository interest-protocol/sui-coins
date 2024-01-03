import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TimesSVG } from '@/svg';

import MenuSettingsList from '../menu-settings';
import { MainMenuMobileProps } from './menu.types';
import MobileMenuList from './menu-list';

const MainMenu: FC<MainMenuMobileProps> = ({ closeMenu }) => (
  <Box
    m="0 1.25rem"
    display="flex"
    minHeight="100%"
    variant="container"
    justifyItems="unset"
    flexDirection="column"
    justifyContent="space-between"
  >
    <Box zIndex="2" gridColumn="1/-1">
      <Box display="flex" justifyContent="flex-end">
        <Button
          isIcon
          variant="text"
          width="1.5rem"
          height="1.5rem"
          onClick={closeMenu}
        >
          <TimesSVG
            width="100%"
            height="100%"
            maxWidth="100%"
            maxHeight="100%"
          />
        </Button>
      </Box>
      <Typography m="xl" variant="title" size="large" color="onSurfaceVariant">
        Menu
      </Typography>
      <MobileMenuList />
      <MenuSettingsList />
    </Box>
  </Box>
);

export default MainMenu;
