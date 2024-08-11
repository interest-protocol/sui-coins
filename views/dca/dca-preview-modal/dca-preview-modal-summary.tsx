import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { DCA_FEE_PERCENTAGE } from '@/constants/fees';

const DCAPreviewModalSummary: FC = () => (
  <Box display="flex" flexDirection="column" mb="m" gap="l">
    <Box bg="surface" px="m" py="2xs" borderRadius="xs">
      <Box py="m" display="flex" justifyContent="space-between">
        <Typography
          variant="body"
          size="medium"
          opacity="0.80"
          color="#000000A3"
        >
          DCA fee
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography mr="s" variant="body" size="medium" color="onSurface">
            {DCA_FEE_PERCENTAGE}%
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default DCAPreviewModalSummary;
