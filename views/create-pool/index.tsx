import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { TOKEN_SVG_MAP } from '@/constants/token';

import PoolTitleBar from '../components/pool-title-bar';
import { IPoolForm } from './create-pool.types';
import CreateTokenForm from './create-pool-form';

const CreatePoolPage: FC = () => {
  const { push } = useRouter();
  const { control } = useFormContext<IPoolForm>();
  const tokenAType = useWatch({ control, name: 'tokenA.type' });
  const tokenBType = useWatch({ control, name: 'tokenB.type' });

  const IconA = TOKEN_SVG_MAP[tokenAType] ?? null;
  const IconB = TOKEN_SVG_MAP[tokenBType] ?? null;

  return (
    <Layout>
      <Box width={['100%', '100%', '100%', '100%', '50%']} mx="auto">
        <PoolTitleBar
          name="Create pool"
          onBack={() => push(Routes[RoutesEnum.Pools])}
          iconTokenList={[IconA, IconB].filter((Icon) => Icon)}
        />
        <Box my="xs" mx="auto" display="flex" maxWidth="65rem">
          <CreateTokenForm />
        </Box>
      </Box>
    </Layout>
  );
};

export default CreatePoolPage;
