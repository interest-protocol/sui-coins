import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';

import { useIncineratorManager } from './incinerator.hooks';
import { IncineratorForm } from './incinerator.types';
import IncineratorButton from './incinerator-button';
import IncineratorHeader from './incinerator-header';
import IncineratorNoAsset from './incinerator-no-assets';
import IncineratorTable from './incinerator-table';
import IncineratorFilterTabs from './incinerator-tabs';

const Incinerator: FC = () => {
  const { isFetchingCoinBalances } = useWeb3();
  const { control } = useFormContext<IncineratorForm>();

  const reset = useWatch({ control, name: 'reset' });
  const objects = useWatch({ control, name: 'objects' });

  useIncineratorManager();

  return (
    <Box
      mt="3xl"
      mx="auto"
      width="100%"
      display="flex"
      borderRadius="s"
      maxWidth="51rem"
      bg="lowestContainer"
      flexDirection="column"
    >
      <IncineratorHeader />
      <IncineratorFilterTabs />
      {reset || isFetchingCoinBalances ? (
        <Box
          mx="auto"
          display="flex"
          height="30rem"
          alignItems="center"
          justifyContent="center"
        >
          <ProgressIndicator size={40} variant="loading" />
        </Box>
      ) : !objects?.length ? (
        <IncineratorNoAsset />
      ) : (
        <Box mb="l" display="grid" gap="l">
          <IncineratorTable />
          <IncineratorButton />
        </Box>
      )}
    </Box>
  );
};

export default Incinerator;
