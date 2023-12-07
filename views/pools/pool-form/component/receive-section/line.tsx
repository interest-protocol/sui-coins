import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ReceiveSectionLineProps } from './receive-section.types';

const ReceiveSectionLine: FC<ReceiveSectionLineProps> = ({
  symbol,
  balance,
  Icon,
}) => {
  return (
    <Box
      py="0.5rem"
      px="1rem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        {Icon && <Icon maxWidth="2.5rem" maxHeight="2.5rem" width="100%" />}
        <Typography variant="body" ml="l" size="large">
          {symbol}
        </Typography>
      </Box>
      <Typography variant="body" ml="l" size="large">
        {balance}
      </Typography>
    </Box>
  );
};

export default ReceiveSectionLine;
