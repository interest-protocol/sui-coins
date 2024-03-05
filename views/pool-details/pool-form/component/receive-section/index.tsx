import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ReceiveSectionProps } from './receive-section.types';

const PoolReceiveSection: FC<ReceiveSectionProps> = ({ symbol, balance }) => (
  <Box>
    <Typography variant="body" size="large" mb="m">
      You will receive (estimated):
    </Typography>
    <Box borderRadius="xs" bg="surface" py="xs">
      <Box
        py="xs"
        px="m"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body" size="large">
          {symbol}
        </Typography>
        <Typography variant="body" ml="m" size="large">
          {balance}
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default PoolReceiveSection;
