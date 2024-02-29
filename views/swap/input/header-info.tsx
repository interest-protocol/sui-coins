import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { HeaderInfoProps } from './input.types';

const HeaderInfo: FC<HeaderInfoProps> = ({ label, balance }) => (
  <Box px="l" display="flex" justifyContent="space-between">
    <Typography variant="label" size="small" color="onSurface">
      {label}
    </Typography>
    <Typography variant="label" size="small" color="onSurface">
      Balance:{' '}
      <Typography variant="label" size="small" color="primary" as="span">
        {balance}
      </Typography>
    </Typography>
  </Box>
);

export default HeaderInfo;
