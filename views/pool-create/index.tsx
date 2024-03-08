import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import CreatePoolHeader from './header';
import PoolCreateSteps from './pool-create-steps';

const PoolCreate = () => {
  const { push } = useRouter();
  const handleStepClick = (index: number) => {
    console.log(index);
  };

  return (
    <Layout>
      <CreatePoolHeader
        onBack={() => push(Routes[RoutesEnum.Pools])}
        name={`What type of pool<br />you want to create ?`}
      />
      <Box
        gap="xs"
        mx="auto"
        display="flex"
        maxWidth="65rem"
        flexDirection="column"
        justifyContent="center"
      >
        <PoolCreateSteps steps={5} onStepClick={handleStepClick} />
      </Box>
    </Layout>
  );
};

export default PoolCreate;
