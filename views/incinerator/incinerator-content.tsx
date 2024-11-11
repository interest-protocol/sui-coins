import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';

import { IncineratorForm } from './incinerator.types';
import IncineratorButton from './incinerator-button';
import IncineratorNoAsset from './incinerator-no-assets';
import IncineratorTable from './incinerator-table';

const IncineratorContent: FC = () => {
  const { loading } = useWeb3();
  const { control } = useFormContext<IncineratorForm>();

  const reset = useWatch({ control, name: 'reset' });
  const empty = useWatch({ control, name: 'empty' });

  if (empty && (reset || loading))
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

  if (empty) return <IncineratorNoAsset />;

  return (
    <Box display="grid">
      <IncineratorTable />
      <IncineratorButton />
    </Box>
  );
};

export default IncineratorContent;
