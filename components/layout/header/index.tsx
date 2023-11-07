import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Wallet from '@/components/wallet';
import { LogoSVG } from '@/svg';

import NavBar from './nav-bar';

const Header: FC = () => (
  <Box
    py="m"
    px="xl"
    alignItems="center"
    borderRadius="full"
    bg="lowestContainer"
    display={['flex', 'grid']}
    justifyContent="space-between"
    gridTemplateColumns="1fr 1fr 1fr"
    boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
  >
    <Box display="flex" alignItems="center" height="1.5rem">
      <LogoSVG maxHeight="100%" maxWidth="100%" height="100%" />
    </Box>
    <NavBar />
    <Box display={['none', 'flex']} justifyContent="flex-end">
      <Wallet />
    </Box>
  </Box>
);

export default Header;
