import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { CreatePoolForm } from '../pool-create.types';

const SelectCoins: FC = () => {
  const { getValues } = useFormContext<CreatePoolForm>();
  const { type, isStable, tokens, dex } = getValues();

  return (
    <Box
      my="xl"
      p="2xl"
      mx="auto"
      gap="2rem"
      bg="container"
      maxWidth="33rem"
      borderRadius="xs"
    >
      <Typography variant="label" size="medium" color="onSurface">
        Pool summary
      </Typography>
    </Box>
  );
};

export default SelectCoins;
