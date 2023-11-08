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
    display={['flex', 'flex', 'flex', 'grid']}
    justifyContent="space-between"
    gap="xs"
    borderRadius={['unset', 'unset', 'unset', 'full']}
    gridTemplateColumns="1fr 1fr 1fr"
    boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
    width="100%"
    position={['absolute', 'absolute', 'absolute', 'relative']}
    top="0"
    left="0"
  >
    <Box display="flex" alignItems="center" height="1.5rem">
      <LogoSVG
        maxHeight="7.5rem"
        maxWidth="7.5rem"
        width="7.5rem"
        height="7.5rem"
      />
    </Box>
    <NavBar />
    <Box display={['none', 'flex']} justifyContent="flex-end">
      <Wallet />
    </Box>
  </Box>
);

export default Header;
