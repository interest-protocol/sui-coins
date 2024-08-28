import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ProgressBarProps } from './progress-bar.types';

const ProgressBar: FC<ProgressBarProps> = ({ value, color }) => (
  <Box
    width="100%"
    display="flex"
    aria-valuemin={0}
    role="progressbar"
    aria-valuemax={100}
    borderRadius="full"
    aria-valuenow={value}
    bg={`${color}Container`}
  >
    <Box bg={color} height="0.5rem" width={`${value}%`} borderRadius="full" />
  </Box>
);

export default ProgressBar;
