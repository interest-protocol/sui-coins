import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PoolCreateStepsProps } from './pool-create-steps.types';

const PoolCreateSteps: FC<PoolCreateStepsProps> = ({
  steps,
  onStepClick,
  currentStep,
}) => (
  <Box display="inline-flex" flexDirection="column" justifyContent="center">
    <Box display="flex" justifyContent="center" mb="s">
      {Array.from({ length: steps }).map((_, index) => (
        <Box
          key={index}
          width="1.85rem"
          height="0.25rem"
          cursor="pointer"
          marginRight="xs"
          borderRadius="xs"
          nLastChild={{ marginRight: 0 }}
          onClick={() => onStepClick?.(index)}
          bg={currentStep >= index ? 'primary' : 'outlineVariant'}
          borderColor={currentStep !== index ? 'primary' : 'transparent'}
        />
      ))}
    </Box>
    <Box textAlign="center">
      <Typography size="small" color="onSurface" variant="body">
        {currentStep + 1} of {steps}
      </Typography>
    </Box>
  </Box>
);

export default PoolCreateSteps;
