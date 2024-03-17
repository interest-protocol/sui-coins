import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolTransactionComposition from './composition';
import PoolTransactionInformation from './information';
import PoolTransactionStatistics from './statistics';

const PoolTransaction: FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <PoolTransactionInformation />
      <PoolTransactionStatistics />
      <PoolTransactionComposition />
    </Box>
  );
};

export default PoolTransaction;
