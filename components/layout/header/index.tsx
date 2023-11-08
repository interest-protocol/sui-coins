import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Wallet from '@/components/wallet';
import { LogoSVG } from '@/svg';

import NavBar from './nav-bar';

const Header: FC = () => (
  <Box
    py="m"
    px="xl"
    top="0"
    left="0"
    gap="xs"
    width="100%"
    alignItems="center"
    bg="lowestContainer"
    justifyContent="space-between"
    gridTemplateColumns="1fr 1fr 1fr"
    display={['flex', 'flex', 'flex', 'grid']}
    borderRadius={['unset', 'unset', 'unset', 'full']}
    boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
    position={['absolute', 'absolute', 'absolute', 'relative']}
  >
    <Box display="flex" alignItems="center" height="1.5rem">
      <LogoSVG maxHeight="1.5rem" maxWidth="7.5rem" width="100%" />
    </Box>
    <NavBar />
    <Wallet />
  </Box>
);

export default Header;
