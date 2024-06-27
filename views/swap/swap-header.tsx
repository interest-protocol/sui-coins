/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { AGGREGATORS_LIST } from './swap.data';
import { SwapForm } from './swap.types';

const SwapHeader: FC = () => {
  const { control } = useFormContext<SwapForm>();

  const settings = useWatch({
    control,
    name: 'settings',
  });

  return (
    <Box display="flex" justifyContent="center">
      <Typography
        size="large"
        fontWeight="700"
        color="onSurface"
        variant="headline"
        fontFamily="Satoshi"
      >
        Swap
      </Typography>
    </Box>
  );
};

export default SwapHeader;
