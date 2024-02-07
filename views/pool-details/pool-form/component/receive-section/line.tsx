import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ReceiveSectionLineProps } from './receive-section.types';

const ReceiveSectionLine: FC<ReceiveSectionLineProps> = ({
  symbol,
  balance,
  Icon,
}) => (
  <Box
    py="0.5rem"
    px="1rem"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
  >
    <Box display="flex" alignItems="center">
      {Icon && (
        <Box
          color="lowestContainer"
          bg="#000"
          width="2.5rem"
          height="2.5rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="0.5rem"
        >
          <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
        </Box>
      )}
      <Typography variant="body" ml="l" size="large">
        {symbol}
      </Typography>
    </Box>
    <Typography variant="body" ml="l" size="large">
      {balance}
    </Typography>
  </Box>
);

export default ReceiveSectionLine;
