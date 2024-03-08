import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { BATCH_SIZE } from '@/views/airdrop/airdrop.constants';

const SwapPreviewModalSummary: FC = () => {
  const { control } = useFormContext();

  const airdropList = useWatch({ control, name: 'airdropList' });

  return (
    <Box display="flex" flexDirection="column" mb="m">
      <Box bg="surface" px="m" py="2xs" borderRadius="xs">
        <Box
          py="m"
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
            Exchange Rate
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              --
            </Typography>
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="onSurface"
          >
            Exchange fee
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              {airdropList ? Math.ceil(airdropList.length / BATCH_SIZE) : '--'}
            </Typography>
          </Box>
        </Box>
        <Box
          py="m"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="onSurface"
          >
            Network fee
          </Typography>
          <Box textAlign="right">
            <Typography size="medium" variant="body" color="onSurface">
              0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SwapPreviewModalSummary;
