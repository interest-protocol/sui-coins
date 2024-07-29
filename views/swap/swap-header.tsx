import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const SwapHeader: FC = () => (
  <Box display="flex" justifyContent="center">
    <Typography
      size="large"
      fontWeight="700"
      color="onSurface"
      variant="headline"
      fontFamily="Satoshi"
    >
      Swap
    </Typography>
  </Box>
);

export default SwapHeader;
