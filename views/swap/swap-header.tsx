import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ThreeDotsSVG } from '@/svg';

import { SwapForm } from './swap.types';

const SwapHeader: FC = () => {
  const { control } = useFormContext<SwapForm>();

  const aggregator = useWatch({
    control,
    name: 'aggregator',
  });

  return (
    <Box display="flex" justifyContent="space-between">
      <Typography
        size="large"
        fontWeight="700"
        variant="headline"
        fontFamily="Satoshi"
      >
        Swap
      </Typography>
      <Button
        p="xs"
        variant="outline"
        borderRadius="full"
        borderColor="outlineVariant"
        PrefixIcon={
          <Box height="1.5rem" borderRadius="full">
            <img
              width="100%"
              height="100%"
              alt={aggregator}
              style={{ borderRadius: '999rem' }}
              src={`/images/aggregators/${aggregator}.webp`}
            />
          </Box>
        }
        SuffixIcon={
          <Box width="1.5rem" height="1rem">
            <ThreeDotsSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        }
      >
        <Typography variant="body" size="medium" textTransform="capitalize">
          {aggregator}
        </Typography>
      </Button>
    </Box>
  );
};

export default SwapHeader;
