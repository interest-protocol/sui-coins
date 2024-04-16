import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import AirdropSelectToken from './airdrop-select-token';

const AirdropChooseCoin: FC = () => (
  <Box
    p="xl"
    gap="s"
    bg="container"
    display="flex"
    borderRadius="xs"
    flexDirection="column"
  >
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body" size="large">
        1. Choose coin
      </Typography>
    </Box>
    <AirdropSelectToken />
  </Box>
);

export default AirdropChooseCoin;
