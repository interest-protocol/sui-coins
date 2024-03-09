import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import PoolTitleBar from '../components/pool-title-bar';
import { CreatePoolForm } from './pool-create.types';
import PoolCreateSteps from './pool-create-steps';
import SelectCoins from './select-coins';
import SelectVolatility from './select-volatility';

const stepTitle: ReadonlyArray<string> = [
  'What type of pool you want to create ?',
  'Choose your algorithm',
  'Select your coin and initial Deposit',
  '',
  '',
];

const stepContent: ReadonlyArray<ReactNode> = [
  null,
  <SelectVolatility key={v4()} />,
  <SelectCoins key={v4()} />,
  null,
  null,
];

const PoolCreate = () => {
  const { push } = useRouter();
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const currentStep = useWatch({ control, name: 'step' });

  const onStepClick = (index: number) => setValue('step', index);

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
      {stepContent[currentStep]}
    </Layout>
  );
};

export default PoolCreate;
