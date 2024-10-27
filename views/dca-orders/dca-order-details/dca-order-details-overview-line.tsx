import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { DCAOrderDetailsOverviewLineProps } from '../dca-orders.types';

const DCAOrderDetailsOverviewLine: FC<DCAOrderDetailsOverviewLineProps> = ({
  title,
  value,
  isFirstLine,
}) => {
  return (
    <Box
      py="s"
      display="flex"
      borderTop={isFirstLine ? 'unset' : '1px solid'}
      borderColor={isFirstLine ? 'unset' : 'outlineVariant'}
      justifyContent="space-between"
    >
      <Typography variant="body" size="small" color="onSurface">
        {title}
      </Typography>
      <Typography variant="body" size="small">
        {value}
      </Typography>
    </Box>
  );
};

export default DCAOrderDetailsOverviewLine;
