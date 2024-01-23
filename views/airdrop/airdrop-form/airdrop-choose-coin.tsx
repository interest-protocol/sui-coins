import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import AirdropSelectToken from './airdrop-select-token';

const AirdropChooseCoin: FC = () => (
  <Box
    p="xl"
    gap="s"
    display="flex"
    borderRadius="xs"
    bg="lowestContainer"
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
