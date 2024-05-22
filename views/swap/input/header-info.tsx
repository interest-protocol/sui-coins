import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  return (
    <Box px="l" display="flex" justifyContent="space-between" color="onSurface">
      <Typography variant="label" size="medium" fontSize="s">
        You {label == 'from' ? 'pay' : 'receive'}
      </Typography>
    </Box>
  );
};

export default HeaderInfo;
