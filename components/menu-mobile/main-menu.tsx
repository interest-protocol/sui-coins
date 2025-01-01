import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { PARTNERS } from '@/constants';
import { ArrowTopRightSVG } from '@/svg';

import MenuButton from '../wallet/menu-button';
import { MainMenuMobileProps } from './menu.types';
import MobileMenuList from './menu-list';
import MenuSettingsList from './menu-settings';
import Image from 'next/image';

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
      >
        <MenuButton handleClose={closeMenu} />
      </Box>
      <Typography m="xl" variant="title" size="small">
        Menu
      </Typography>
      <MobileMenuList />
      {PARTNERS.map(({ link, name, img }) => (
        <Box
          my="l"
          key={v4()}
          borderRadius="s"
          border="1px solid"
          borderColor="outlineVariant"
        >
          <a href={link} target="_blank" rel="noreferrer">
            <Box
              p="s"
              pr="s"
              display="flex"
              cursor="pointer"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                gap="s"
                display="flex"
                alignItems="center"
                justifyItems="center"
              >
                <Box
                  width="2rem"
                  height="2rem"
                  overflow="hidden"
                  borderRadius="50%"
                >
                  <Image
                    src={img}
                    alt={name}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
                <Typography
                  size="large"
                  variant="label"
                  textDecoration="underline"
                >
                  {name}
                </Typography>
              </Box>
              <ArrowTopRightSVG
                width="100%"
                maxWidth="1.5rem"
                maxHeight="1.5rem"
              />
            </Box>
          </a>
        </Box>
      ))}
      <MenuSettingsList />
    </Box>
  </Box>
);

export default MainMenu;
