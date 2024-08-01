import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Checkpoint from '../layout/checkpoint';
import MenuButton from '../wallet/menu-button';
import { MainMenuMobileProps } from './menu.types';
import MobileMenuList from './menu-list';
import MenuSettingsList from './menu-settings';

const MainMenu: FC<MainMenuMobileProps> = ({ closeMenu }) => (
  <Box
    mx="l"
    my="0"
    display="flex"
    minHeight="100%"
    variant="container"
    flexDirection="column"
    justifyContent="space-between"
  >
    <Box zIndex="2" gridColumn="1/-1">
      <Box
        display={['flex', 'flex', 'flex', 'none']}
        flexDirection="row-reverse"
        pb="l"
        color="onSurface"
      >
        <MenuButton handleClose={closeMenu} />
      </Box>
      <Typography m="xl" variant="title" size="small" color="onSurface">
        Menu
      </Typography>
      <MobileMenuList />
      <MenuSettingsList />
    </Box>
    <Box my="l">
      <Checkpoint />
    </Box>
  </Box>
);

export default MainMenu;
