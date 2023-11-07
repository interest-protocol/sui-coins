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
    bg="lowestContainer"
    display={['flex', 'grid']}
    justifyContent="space-between"
    borderRadius={['unset', 'unset', 'unset', 'full']}
    gridTemplateColumns="1fr 1fr 1fr"
    boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
    width="100%"
    position={['absolute', 'absolute', 'absolute', 'relative']}
    top="0"
    left="0"
  >
    <Box display="flex" alignItems="center" height="1.5rem">
      <LogoSVG maxHeight="100%" maxWidth="100%" height="100%" />
    </Box>
    <NavBar />
    <Wallet />
  </Box>
);

export default Header;
