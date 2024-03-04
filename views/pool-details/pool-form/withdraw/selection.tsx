import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import RadioField from './radio-field';

const Selection: FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Typography variant="body" size="large">
        2. Choose type
      </Typography>
      <Box
        border="1px solid"
        borderColor="container"
        px="1.5rem"
        py="1rem"
        bg="container"
        borderRadius="0.5rem"
        display="flex"
        gap="1.5rem"
      >
        <RadioField label="One Coin" />
        <RadioField label="Balance" />
      </Box>
    </Box>
  );
};

export default Selection;
