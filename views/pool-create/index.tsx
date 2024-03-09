import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import CreatePoolHeader from './header';
import { stepContent, stepTitle } from './pool-create.data';
import PoolCreateSteps from './pool-create-steps';

const PoolCreate = () => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const onStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <Layout>
      <CreatePoolHeader
        onBack={() => push(Routes[RoutesEnum.Pools])}
        name={stepTitle[currentStep]}
      />
      <Box
        gap="xs"
        mx="auto"
        display="flex"
        maxWidth="65rem"
        flexDirection="column"
        justifyContent="center"
      >
        <PoolCreateSteps
          steps={5}
          onStepClick={onStepClick}
          currentStep={currentStep}
        />
      </Box>
      <Box my="xl">{stepContent[currentStep]}</Box>
      <Button
        mx="auto"
        variant="filled"
        onClick={() =>
          onStepClick(currentStep === 4 ? currentStep : currentStep + 1)
        }
      >
        Next
      </Button>
    </Layout>
  );
};

export default PoolCreate;
