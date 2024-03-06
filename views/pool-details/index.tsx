import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { RECOMMENDED_POOLS } from '@/constants/pools';
import { useNetwork } from '@/context/network';
import { TOKEN_ICONS } from '@/lib';

import PoolTitleBar from '../components/pool-title-bar';
import Error from '../error';
import PoolAdvanceDetail from './pool-advance-detail';
import PoolDetail from './pool-detail';
import { PoolDetailsProps, PoolDetailsTabOption } from './pool-details.types';
import PoolDetailsTabs from './pool-details-tabs';
import PoolForm from './pool-form';

const PoolDetails: FC<PoolDetailsProps> = ({
  objectId,
  poolOptionView,
  handleOptionTab,
}) => {
  const { push } = useRouter();
  const { network } = useNetwork();

  const [poolDetailsView, setPoolDetailsView] = useState<PoolDetailsTabOption>(
    PoolDetailsTabOption.Detail
  );

  const handleTabChange = (index: PoolDetailsTabOption) => {
    setPoolDetailsView(index);
  };

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
        <PoolForm
          poolOptionView={poolOptionView}
          handleOptionTab={handleOptionTab}
        />
        <Box color="onSurface" borderRadius="xs" bg="lowestContainer">
          <PoolDetailsTabs
            onChangeTab={handleTabChange}
            defaultTabIndex={poolDetailsView}
            items={['Pool Detail', 'Advance Details']}
          />

          {poolDetailsView === PoolDetailsTabOption.Detail ? (
            <PoolDetail />
          ) : (
            <PoolAdvanceDetail />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default PoolDetails;
