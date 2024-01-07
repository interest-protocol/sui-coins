import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { LineProps } from './line.types';

const PoolTransactionLine: FC<LineProps> = ({ value, Suffix, description }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="body" size="medium" color="rgba(0, 0, 0, 0.64)">
          {description}
        </Typography>
        <Typography variant="body" size="large">
          {value}
        </Typography>
      </Box>
      {Suffix}
    </Box>
  );
};

export default PoolTransactionLine;
