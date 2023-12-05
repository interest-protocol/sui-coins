import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CompositionItemProps } from './composition-item.type';

const CompositionItem: FC<CompositionItemProps> = ({
  Logo,
  symbol,
  amount,
}) => {
  return (
    <Box
      display="flex"
      gap="0.75rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" gap="0.75rem" alignItems="center">
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
          <Logo maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
        </Box>
        <Typography variant="body" size="medium">
          {symbol}
        </Typography>
      </Box>
      <Typography variant="body" size="large">
        {amount}
      </Typography>
    </Box>
  );
};

export default CompositionItem;
