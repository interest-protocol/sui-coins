import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

interface PoolCreateStepsProps {
  steps: number;
  onStepClick: (index: number) => void;
}

const PoolCreateSteps: FC<PoolCreateStepsProps> = ({ steps, onStepClick }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepsIterator = Array.from({ length: steps });

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    onStepClick(index);
  };

  return (
    <Box display="inline-flex" flexDirection="column" justifyContent="center">
      <Box display="flex" justifyContent="center" mb="s">
        {stepsIterator.map((_, index) => (
          <Box
            key={index}
            width="1.85rem"
            height="0.25rem"
            cursor="pointer"
            marginRight="xs"
            borderRadius="xs"
            nLastChild={{ marginRight: 0 }}
            onClick={() => handleStepClick(index)}
            bg={currentStep === index ? 'primary' : 'outlineVariant'}
            borderColor={currentStep !== index ? 'primary' : 'transparent'}
          />
        ))}
      </Box>
      <Box textAlign="center">
        <Typography size="small" color="onSurface" variant="body">
          01 of {steps}
        </Typography>
      </Box>
    </Box>
  );
};

export default PoolCreateSteps;
