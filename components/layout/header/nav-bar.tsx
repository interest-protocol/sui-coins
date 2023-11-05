import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const NavBar: FC = () => (
  <Box display="flex" gap="m">
    <Box fontFamily="Proto">Create Token</Box>
    <Box fontFamily="Proto">My Coins</Box>
  </Box>
);

export default NavBar;
