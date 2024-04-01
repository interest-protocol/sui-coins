import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { PoolDetailsTabOption } from '../pool-details.types';
import PoolAdvanceDetail from './advance-detail';
import DetailTabs from './components/detail-tabs';
import PoolDetail from './pool-detail';

const PoolAdditionalInfo: FC = () => {
  const [poolDetailsView, setPoolDetailsView] = useState<PoolDetailsTabOption>(
    PoolDetailsTabOption.Detail
  );

  const handleTabChange = (index: PoolDetailsTabOption) => {
    setPoolDetailsView(index);
  };

  return (
    <Box width="100%" color="onSurface" borderRadius="xs" bg="container">
      <DetailTabs
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
  );
};

export default PoolAdditionalInfo;
