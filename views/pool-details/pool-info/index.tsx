import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { PoolDetailsTabOption } from '../pool-details.types';
import DetailTabs from './components/detail-tabs';
import PoolInfoAdvanced from './pool-info-advanced';
import PoolInfoDetail from './pool-info-detail';

const PoolInfo: FC = () => {
  const [poolDetailsView, setPoolDetailsView] = useState<PoolDetailsTabOption>(
    PoolDetailsTabOption.Detail
  );

  return (
    <Box
      color="onSurface"
      borderRadius="xs"
      bg="lowestContainer"
      width="fill-available"
    >
      <DetailTabs
        onChangeTab={setPoolDetailsView}
        defaultTabIndex={poolDetailsView}
        items={['Pool Detail', 'Advance Details']}
      />
      {poolDetailsView === PoolDetailsTabOption.Detail ? (
        <PoolInfoDetail />
      ) : (
        <PoolInfoAdvanced />
      )}
    </Box>
  );
};

export default PoolInfo;
