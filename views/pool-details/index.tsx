import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';
import { TOKEN_ICONS } from '@/lib';

import PoolTitleBar from '../components/pool-title-bar';
import Error from '../error';
import { PoolDetailsProps } from './pool-details.types';
import PoolForm from './pool-form';

const PoolDetails: FC<PoolDetailsProps> = ({ objectId }) => {
  const { push } = useRouter();
  const { network } = useNetwork();

  const pool = RECOMMENDED_POOLS[network].find(
    ({ poolObjectId }) => poolObjectId === objectId
  );

  if (!pool) return <Error message="Pool Not Found" />;

  const { tokens } = pool;

  return (
    <Layout>
      <PoolTitleBar
        iconTokenList={tokens.map(
          (token) => TOKEN_ICONS[network][token.symbol]
        )}
        onBack={() => push(Routes[RoutesEnum.Pools])}
        name={tokens.reduce(
          (acc, { symbol }) => `${acc ? `${acc}•` : ''}${symbol}`,
          ''
        )}
      />
      <Box
        gap="xs"
        mx="auto"
        maxWidth="65rem"
        flexDirection="column"
        gridTemplateColumns="62% 38%"
        display={['flex', 'flex', 'flex', 'grid']}
      >
        <PoolForm />
        <Box
          color="onSurface"
          borderRadius="xs"
          bg="lowestContainer"
          p={['m', 'm', 'm', 'xl']}
        >
          Pool additional info
        </Box>
      </Box>
    </Layout>
  );
};

export default PoolDetails;
