import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ProgressBarProps } from './progress-bar.types';

const ProgressBar: FC<ProgressBarProps> = ({ value, bg }) => (
  <Box
    p="2px"
    bg={bg}
    width="100%"
    display="flex"
    aria-valuemin={0}
    role="progressbar"
    aria-valuemax={100}
    borderRadius="full"
    aria-valuenow={value}
  >
    <Box
      height="0.5rem"
      width={`${value}%`}
      borderRadius="full"
      background="onPrimary"
    />
  </Box>
);

export default ProgressBar;
