import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import AirdropSelectToken from './airdrop-select-token';

const AirdropChooseCoin: FC = () => (
  <Box
    p="xl"
    gap="s"
    display="flex"
    borderRadius="xs"
    bg="container"
    flexDirection="column"
  >
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body" size="large" color="onSurface">
        1. Choose coin
      </Typography>
    </Box>
    <AirdropSelectToken />
  </Box>
);

export default AirdropChooseCoin;
