import { Box, Typography } from '@interest-protocol/ui-kit';
import { formatNumber } from '@polymedia/suits';
import { FC } from 'react';

import { CustomTooltipProps } from './tooltip.types';

const CustomTooltip: FC<CustomTooltipProps> = ({ payload }) => {
  if (!(payload && payload.length)) return null;

  return (
    <Box
      p="s"
      bg="white"
      borderRadius="xs"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.30)"
    >
      {payload.map(({ value, payload, dataKey }) => (
        <Box key={`tooltip-${dataKey}`}>
          <Typography variant="body" size="small" color="dark" mb="2xs">
            {formatNumber(value, 'compact')}
          </Typography>
          <Typography variant="body" size="small" color="outlineVariant">
            {payload?.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CustomTooltip;
