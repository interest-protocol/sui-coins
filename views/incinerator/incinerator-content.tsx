import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useIncineratorManager } from './incinerator.hooks';
import IncineratorButton from './incinerator-button';
import IncineratorNoAsset from './incinerator-no-assets';
import IncineratorTable from './incinerator-table';

const IncineratorContent: FC = () => {
  const { reset, isFetchingCoinBalances, objects } = useIncineratorManager();

  if (reset || isFetchingCoinBalances)
    return (
      <Box
        mx="auto"
        display="flex"
        height="30rem"
        alignItems="center"
        justifyContent="center"
      >
        <ProgressIndicator size={40} variant="loading" />
      </Box>
    );

  if (!objects?.length) return <IncineratorNoAsset />;

  return (
    <Box mb="l" display="grid" gap="l">
      <IncineratorTable />
      <IncineratorButton />
    </Box>
  );
};

export default IncineratorContent;
