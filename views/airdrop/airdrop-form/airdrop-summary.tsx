import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { FixedPointMath } from '@/lib';
import { QuestionCircleSVG } from '@/svg';
import { BATCH_SIZE } from '@/views/airdrop/airdrop.constants';

import { AirdropSummaryProps, IAirdropForm } from '../airdrop.types';

const AirdropSummary: FC<AirdropSummaryProps> = ({ method }) => {
  const { control } = useFormContext<IAirdropForm>();

  const airdropList = useWatch({ control, name: 'airdropList' });

  return (
    <Box display="flex" flexDirection="column" mb="m">
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
            Delivery method
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
            Total addresses
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
            Total SUI fee
          </Typography>
          <Box textAlign="right">
            <Typography size="medium" variant="body">
              {airdropList
                ? FixedPointMath.toNumber(
                    new BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS).times(
                      airdropList.length
                    )
                  ).toString()
                : '0'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AirdropSummary;
