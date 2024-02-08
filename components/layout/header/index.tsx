import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Wallet from '@/components/wallet';
import { LogoSVG } from '@/svg';

const Header: FC = () => (
  <>
    <Box
      py="m"
      px="xl"
      top="0"
      left="0"
      right="0"
      gap="xs"
      zIndex="1"
      width="100%"
      position="relative"
      alignItems="center"
      borderBottom="1px solid"
      justifyContent="flex-end"
      borderColor="outlineVariant"
      gridTemplateColumns="1fr 1fr"
      display={['none', 'none', 'none', 'flex']}
    >
      <Wallet />
    </Box>
    <Box
      py="m"
      px="xl"
      top="0"
      gap="xs"
      zIndex={3}
      width="100%"
      position="relative"
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
