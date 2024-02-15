import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { TOKEN_ICONS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { DefaultSVG } from '@/svg';

import PoolTitleBar from '../components/pool-title-bar';
import { IPoolForm } from './find-pool.types';
import FindPoolForm from './find-pool-form';

const FindPool: FC = () => {
  const { push } = useRouter();

  const { network } = useNetwork();
  const { control } = useFormContext<IPoolForm>();
  const tokenAType = useWatch({ control, name: 'tokenA.type' });
  const tokenBType = useWatch({ control, name: 'tokenB.type' });

  const IconA = TOKEN_ICONS[network][tokenAType] ?? DefaultSVG;
  const IconB = TOKEN_ICONS[network][tokenBType] ?? DefaultSVG;

  return (
    <Layout>
      <Box width={['100%', '100%', '100%', '100%', '50%']} mx="auto">
        <PoolTitleBar
          name="Find pool"
          onBack={() => push(Routes[RoutesEnum.Pools])}
          iconTokenList={[IconA, IconB].filter((Icon) => Icon)}
        />
        <Box my="xs" mx="auto" display="flex" maxWidth="65rem">
          <FindPoolForm />
        </Box>
      </Box>
    </Layout>
  );
};

export default FindPool;
