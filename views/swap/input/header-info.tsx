import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { HeaderInfoProps } from './input.types';

const HeaderInfo: FC<HeaderInfoProps> = ({ label, balance }) => (
  <Box px="l" display="flex" justifyContent="space-between">
    <Typography variant="label" size="small">
      {label}
    </Typography>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="0.2rem"
    >
      <Typography variant="label" size="small">
        Balance:
      </Typography>
      <Typography variant="label" size="small" color="primary">
        {balance || 0}
      </Typography>
    </Box>
  </Box>
);

export default HeaderInfo;
