import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { PoolDetailsTabOption } from '../pool-details.types';
import DetailTabs from './components/detail-tabs';
import PoolInfoAdvanced from './pool-info-advanced';
import PoolInfoAmmDetail from './pool-info-amm-detail';
import PoolInfoClammDetail from './pool-info-clamm-detail';

const PoolInfo: FC = () => {
  const pool = {
    poolType: 'amm',
  };
  const [poolDetailsView, setPoolDetailsView] = useState<PoolDetailsTabOption>(
    PoolDetailsTabOption.Detail
  );

  const handleTabChange = (index: PoolDetailsTabOption) =>
    setPoolDetailsView(index);

  return (
    <Box color="onSurface" borderRadius="xs" bg="container">
      <DetailTabs
        onChangeTab={handleTabChange}
        defaultTabIndex={poolDetailsView}
        items={['Pool Detail'].concat(
          pool?.poolType === 'amm' ? [] : ['Advance Details']
        )}
      />
      {poolDetailsView === PoolDetailsTabOption.Detail ? (
        pool?.poolType !== 'amm' ? (
          <PoolInfoClammDetail />
        ) : (
          <PoolInfoAmmDetail />
        )
      ) : (
        pool?.poolType !== 'amm' && <PoolInfoAdvanced />
      )}
    </Box>
  );
};

export default PoolInfo;
