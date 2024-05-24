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
    <Box display="flex" justifyContent="space-between">
      <Typography
        size="large"
        fontWeight="700"
        color="onSurface"
        variant="headline"
        fontFamily="Satoshi"
      >
        Swap
      </Typography>
      <Button
        key={v4()}
        p="xs"
        variant="outline"
        color="onSurface"
        borderRadius="full"
        borderColor="outlineVariant"
        PrefixIcon={
          <Box height="1.5rem" width="1.5rem" borderRadius="full">
            <img
              width="100%"
              height="100%"
              style={{ borderRadius: '999rem' }}
              alt={AGGREGATORS_LIST[settings.aggregator]?.name}
              src={AGGREGATORS_LIST[settings.aggregator]?.logo}
            />
          </Box>
        }
      >
        <Typography
          variant="body"
          size="medium"
          textTransform="capitalize"
          pr="xs"
        >
          {AGGREGATORS_LIST[settings.aggregator]?.shortName}
        </Typography>
      </Button>
    </Box>
  );
};

export default SwapHeader;
