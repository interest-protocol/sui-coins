import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { DotErrorSVG } from '@/svg';
import { PoolForm } from '@/views/pools/pools.types';

const WithdrawManager: FC = () => {
  const { control } = useFormContext<PoolForm>();

  const error = useWatch({ control, name: 'error' });

  if (!error) return null;

  return (
    <Box
      p="s"
      mx="xl"
      gap="s"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      bg="errorContainer"
      color="onErrorContainer"
      borderColor="onErrorContainer"
    >
      <DotErrorSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      <Typography variant="label" size="medium">
        {error}
      </Typography>
    </Box>
  );
};

export default WithdrawManager;
