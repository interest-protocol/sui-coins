import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { QuestionCircleSVG } from '@/svg';
import { BATCH_SIZE } from '@/views/airdrop/airdrop.constants';

import { IAirdropForm } from './airdrop.types';

interface AirdropSummmaryProps {
  method: string;
}

const AirdropSummary: FC<AirdropSummmaryProps> = ({ method }) => {
  const { control } = useFormContext<IAirdropForm>();

  const airdropList = useWatch({ control, name: 'airdropList' });
  const suiFee = 0;

  return (
    <Box display="flex" flexDirection="column">
      <Box bg="container" px="m" py="2xs" borderRadius="xs">
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
            color="#000000A3"
          >
            Delivery Method
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              {method || '--'}
            </Typography>
            <QuestionCircleSVG
              maxHeight="0.875rem"
              maxWidth="0.875rem"
              width="100%"
            />
          </Box>
        </Box>
        <Box
          py="m"
          display="flex"
          borderBottom="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Addresses sent to
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              {airdropList ? airdropList.length : '--'}
            </Typography>
            <QuestionCircleSVG
              maxHeight="0.875rem"
              maxWidth="0.875rem"
              width="100%"
            />
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Sent in batches of
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
            <QuestionCircleSVG
              maxHeight="0.875rem"
              maxWidth="0.875rem"
              width="100%"
            />
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
            color="#000000A3"
          >
            SUI Fee
          </Typography>
          <Box textAlign="right">
            <Typography size="medium" variant="body">
              {suiFee || '--'}
            </Typography>
            <Typography variant="body" size="small" color="#000000A3">
              --
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AirdropSummary;
