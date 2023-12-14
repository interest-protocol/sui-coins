import { Box, Typography } from '@interest-protocol/ui-kit';
import { useFormContext, useWatch } from 'react-hook-form';

import { IAirdropForm } from './airdrop.types';

const AirdropSummary = () => {
  const { control } = useFormContext<IAirdropForm>();

  const { value, symbol } = useWatch({ control, name: 'token' });
  const airdropList = useWatch({ control, name: 'airdropList' });

  return (
    <Box display="flex" flexDirection="column" gap="s">
      <Typography variant="body" size="large">
        Summary
      </Typography>
      <Box bg="surface" px="m" py="xs" borderRadius="xs">
        <Box
          py="xs"
          display="flex"
          borderBottom="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            size="medium"
            variant="body"
            opacity="0.80"
            color="onSurface"
          >
            You will send
          </Typography>
          <Typography variant="body" size="medium" color="onSurface">
            {value} {symbol}
          </Typography>
        </Box>
        <Box
          py="xs"
          display="flex"
          borderBottom="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="onSurface"
          >
            Total Addresses
          </Typography>
          <Typography variant="body" size="medium" color="onSurface">
            {airdropList ? airdropList.length : '--'}
          </Typography>
        </Box>
        <Box py="xs" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="onSurface"
          >
            Sent in batches of
          </Typography>
          <Typography variant="body" size="medium" color="onSurface">
            --
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AirdropSummary;
