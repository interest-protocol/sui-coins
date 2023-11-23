import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Wallet from '@/components/wallet';
import { LogoSVG } from '@/svg';

import NavBar from './nav-bar';

const Header: FC = () => (
  <>
    <Box
      mb="0 !important"
      variant="container"
      display={['none', 'none', 'none', 'grid']}
      width={['auto', 'auto', 'auto', 'auto', '100%']}
      pt="2rem !important"
    >
      <Box
        py="m"
        px="xl"
        top="0"
        left="0"
        right="0"
        gap="xs"
        zIndex="1"
        display="flex"
        width="100%"
        gridColumn="1/-1"
        alignItems="center"
        bg="lowestContainer"
        position="relative"
        borderRadius="full"
        justifyContent="space-between"
        gridTemplateColumns="1fr 1fr"
        boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
      >
        <Box display="flex" alignItems="center" gap="8xl">
          <Box display="flex" alignItems="center" height="1.5rem">
            <LogoSVG maxHeight="1.5rem" maxWidth="7.5rem" width="100%" />
          </Box>
          <NavBar />
        </Box>
        <Wallet />
      </Box>
    </Box>
    <Box
      py="m"
      px="xl"
      top="0"
      gap="xs"
      zIndex="1"
      width="100%"
      position="absolute"
      alignItems="center"
      bg="lowestContainer"
      justifyContent="space-between"
      gridTemplateColumns="1fr 1fr 1fr"
      display={['flex', 'flex', 'flex', 'none']}
      boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
    >
      <Box display="flex" alignItems="center" height="1.5rem">
        <LogoSVG maxHeight="1.5rem" maxWidth="7.5rem" width="100%" />
      </Box>
      <Wallet />
    </Box>
  </>
);

export default Header;
