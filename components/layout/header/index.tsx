import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Wallet from '@/components/wallet';
import { LogoSVG } from '@/svg';

import NavBar from './nav-bar';

const Header: FC = () => (
  <Box
    px="l"
    py="m"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
  >
    <Box display="flex" alignItems="center" height="2rem">
      <LogoSVG maxHeight="100%" maxWidth="100%" width="100%" />
    </Box>
    <NavBar />
    <Wallet />
  </Box>
);

export default Header;
