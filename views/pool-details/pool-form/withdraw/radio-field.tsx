import { Box, RadioButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { RadioFieldProps } from './withdraw.types';

const RadioField: FC<RadioFieldProps> = ({ label }) => {
  return (
    <Box display="flex" alignItems="center" gap="0.75rem">
      <RadioButton />
      <Typography variant="body" size="large">
        {label}
      </Typography>
    </Box>
  );
};

export default RadioField;
