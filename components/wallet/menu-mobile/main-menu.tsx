import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import MenuButton from '../menu-button';
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
      <Box
        display={['flex', 'flex', 'flex', 'none']}
        flexDirection="row-reverse"
        pb="l"
      >
        <MenuButton handleClose={closeMenu} />
      </Box>
      <Typography m="xl" variant="title" size="small">
        Menu
      </Typography>
      <MobileMenuList />
      <MenuSettingsList />
    </Box>
  </Box>
);

export default MainMenu;
