/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { LOCAL_STORAGE_VERSION } from '@/constants';

import { AGGREGATORS_LIST } from './swap.data';
import { Aggregator, SwapForm } from './swap.types';

const SwapHeader: FC = () => {
  const { control, setValue } = useFormContext<SwapForm>();

  const settings = useWatch({
    control,
    name: 'settings',
  });

  useEffect(() => {
    setValue('settings.aggregator', Aggregator.Native);
    localStorage.setItem(
      `${LOCAL_STORAGE_VERSION}-movement-settings`,
      JSON.stringify({
        slippage: settings.slippage,
        interval: settings.interval,
        Aggregator,
      })
    );
  }, [settings]);

  console.log('aggregator data :: ', Aggregator);

  return (
    <Box display="flex" justifyContent="space-between" my="s" mx="m">
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
        <Typography variant="body" size="medium" textTransform="capitalize">
          {AGGREGATORS_LIST[settings.aggregator]?.shortName}
        </Typography>
      </Button>
    </Box>
  );
};

export default SwapHeader;
