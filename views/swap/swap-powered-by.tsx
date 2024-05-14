import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapForm } from './swap.types';

const SwapPoweredBy: FC = () => {
  const { control } = useFormContext<SwapForm>();

  const aggregator = useWatch({
    control,
    name: 'aggregator',
  });

  return (
    <a target="_blank" rel="noopener, noreferrer" href={aggregator.url}>
      <Box
        gap="s"
        display="flex"
        borderRadius="xs"
        alignItems="center"
        bg="lowestContainer"
        justifyContent="center"
      >
        <Typography variant="label" size="small" fontSize="s">
          Powered By:
        </Typography>
        <Box display="flex" alignItems="center" gap="xs">
          <Box width="1.5rem" height="1.5rem">
            <img
              width="100%"
              height="100%"
              src={aggregator.logo}
              alt={aggregator.name}
              style={{ borderRadius: '9999rem' }}
            />
          </Box>
          <Typography
            fontSize="s"
            size="medium"
            variant="body"
            fontWeight="500"
            textTransform="capitalize"
          >
            {aggregator.name}
          </Typography>
        </Box>
      </Box>
    </a>
  );
};

export default SwapPoweredBy;
