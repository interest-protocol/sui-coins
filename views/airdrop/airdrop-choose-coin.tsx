import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import AirdropSelectToken from './airdrop-select-token';

const AirdropChooseCoin: FC = () => (
  <Box display="flex" flexDirection="column" gap="s">
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body" size="large" color="onSurface">
        1. Choose coin
      </Typography>
    </Box>
    <AirdropSelectToken />
  </Box>
);

export default AirdropChooseCoin;
