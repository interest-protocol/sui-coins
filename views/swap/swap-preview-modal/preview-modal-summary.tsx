import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { QuestionCircleSVG } from '@/svg';

import { PreviewModalSummaryProps } from './swap-preview-modal.types';

const PreviewModalSummary: FC<PreviewModalSummaryProps> = ({
  exchangeRate,
  exchangeFee,
  networkFee,
}) => {
  return (
    <Box display="flex" flexDirection="column" mx="m" my="9xl" mb="s">
      <Box bg="container" px="s" borderRadius="xs">
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
            Exchange Rate
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              1 USD = {exchangeRate} USDT
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
            Exchange Fee
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              $ {exchangeFee} USD
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
            Network Fee
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              $ {networkFee} USD
            </Typography>
            <QuestionCircleSVG
              maxHeight="0.875rem"
              maxWidth="0.875rem"
              width="100%"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewModalSummary;
