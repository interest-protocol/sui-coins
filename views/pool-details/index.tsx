import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { TOKEN_ICONS } from '@/lib';

import PoolTitleBar from '../components/pool-title-bar';
import Error from '../error';
import PoolAdditionalInfo from './additional-info';
import { PoolDetailsProps } from './pool-details.types';
import PoolForm from './pool-form';

const PoolDetails: FC<PoolDetailsProps> = ({
  objectId,
  poolOptionView,
  handleOptionTab,
}) => {
  const { push } = useRouter();
  const network = useNetwork();

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
        overflow="hidden"
        alignItems="start"
        flexDirection="column"
        gridTemplateColumns="62% 38%"
        display={['flex', 'flex', 'flex', 'grid']}
      >
        <PoolForm
          poolOptionView={poolOptionView}
          handleOptionTab={handleOptionTab}
        />
        <PoolAdditionalInfo />
      </Box>
    </Layout>
  );
};

export default PoolDetails;
