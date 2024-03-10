import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { useFormContext, useWatch } from 'react-hook-form';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import CreatePoolHeader from './header';
import { stepContent, stepTitle } from './pool-create.data';
import { CreatePoolForm } from './pool-create.types';
import PoolCreateSteps from './pool-create-steps';

const PoolCreate = () => {
  const { push } = useRouter();
  const { control } = useFormContext<CreatePoolForm>();

  const currentStep = useWatch({ control, name: 'step' });

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
        <PoolCreateSteps steps={5} currentStep={currentStep} />
      </Box>
      {stepContent[currentStep]}
    </Layout>
  );
};

export default PoolCreate;
