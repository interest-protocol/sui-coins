import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AGGREGATORS_LIST } from './swap.data';
import { SwapForm } from './swap.types';

const SwapPoweredBy: FC = () => {
  const { control } = useFormContext<SwapForm>();
  const aggregator = useWatch({ control, name: 'settings.aggregator' });

  const { url, name, Icon } = AGGREGATORS_LIST[aggregator];

  return (
    <Box
      mt="m"
      gap="m"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <a target="_blank" rel="noopener, noreferrer" href={url}>
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
            <Icon maxWidth="1.5rem" maxHeight="1.5rem" width="100%"></Icon>
            <Typography
              fontSize="s"
              size="medium"
              variant="body"
              fontWeight="500"
              textTransform="capitalize"
            >
              {name}
            </Typography>
          </Box>
        </Box>
      </a>
    </Box>
  );
};

export default SwapPoweredBy;
