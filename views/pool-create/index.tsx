import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import PoolTitleBar from '../components/pool-title-bar';
import PoolCreateSteps from './pool-create-steps';
import SelectVolatility from './select-volatility';

const stepTitle: ReadonlyArray<string> = [
  'What type of pool you want to create ?',
  'Choose your algorithm',
  '',
  '',
  '',
];

const stepContent: ReadonlyArray<ReactNode> = [
  null,
  <SelectVolatility key={v4()} />,
  null,
  null,
  null,
];

const PoolCreate = () => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const onStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <Layout>
      <PoolTitleBar
        centerTile
        iconTokenList={[]}
        name={stepTitle[currentStep]}
        onBack={() => push(Routes[RoutesEnum.Pools])}
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
        onClick={() => onStepClick(currentStep + 1)}
      >
        Next
      </Button>
    </Layout>
  );
};

export default PoolCreate;
