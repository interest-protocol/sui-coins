import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { ArrowLeftSVG, TimesSVG } from '@/svg';

import { SwapForm, SwapPreviewModalProps } from '../swap.types';
import SwapButton from '../swap-button';
import SwapPreviewModalSummary from './swap-preview-modal-summary';

const SwapPreviewModal: FC<SwapPreviewModalProps> = ({ onClose }) => {
  const { network } = useNetwork();
  const { control } = useFormContext<SwapForm>();

  const tokenFrom = useWatch({ control, name: 'from' });
  const tokenTo = useWatch({ control, name: 'to' });

  return (
    <Box
      maxWidth="95%"
      borderRadius="xs"
      width="26.875rem"
      minHeight="30rem"
      maxHeight="90vh"
      alignItems="center"
      display="inline-flex"
      justifyContent="space-between"
      flexDirection="column"
      boxShadow="dropShadow.2xl"
      backgroundColor="lowestContainer"
    >
      <Box width="100%">
        <Box
          p="xl"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <ArrowLeftSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          <Typography size="large" variant="title">
            Swap
          </Typography>
          <TimesSVG
            onClick={onClose}
            width="100%"
            maxWidth="1rem"
            cursor="pointer"
            maxHeight="1rem"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="m">
          <Box
            px="xl"
            display="flex"
            flexDirection="column"
            justifyContent="start"
          >
            <Typography size="medium" variant="label" mb="xs">
              FROM
            </Typography>
            <Box
              bg="#EDEDF1"
              p="0.75rem"
              borderRadius="xs"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap="m">
                <Box
                  bg="black"
                  color="white"
                  width="2.5rem"
                  height="2.5rem"
                  borderRadius="xs"
                  alignItems="center"
                  display="inline-flex"
                  justifyContent="center"
                >
                  <TokenIcon
                    network={network}
                    tokenId={
                      network === Network.MAINNET
                        ? tokenFrom.type
                        : tokenFrom.symbol
                    }
                  />
                </Box>
                <Typography size="small" variant="title">
                  {tokenFrom.symbol}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="body" size="medium">
                  {tokenFrom.value || 0}
                </Typography>
                <Typography variant="body" size="small" color="#000000A3">
                  {tokenFrom.usdPrice
                    ? Number(tokenFrom.value || 0) * tokenFrom.usdPrice
                    : '--'}{' '}
                  USD
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              px="xl"
              pb="xl"
              pt="2xs"
              display="flex"
              flexDirection="column"
              justifyContent="start"
            >
              <Typography size="medium" variant="label" mb="xs">
                TO (ESTIMATED)
              </Typography>
              <Box
                bg="#EDEDF1"
                p="0.75rem"
                borderRadius="xs"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap="m">
                  <Box
                    bg="black"
                    color="white"
                    width="2.5rem"
                    height="2.5rem"
                    borderRadius="xs"
                    alignItems="center"
                    display="inline-flex"
                    justifyContent="center"
                  >
                    <TokenIcon
                      network={network}
                      tokenId={
                        network === Network.MAINNET
                          ? tokenTo.type
                          : tokenTo.symbol
                      }
                    />
                  </Box>
                  <Typography size="small" variant="title">
                    {tokenTo.symbol}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body" size="medium">
                    {tokenTo.value || 0}
                  </Typography>
                  <Typography variant="body" size="small" color="#000000A3">
                    {tokenTo.usdPrice
                      ? Number(tokenTo.value || 0) * tokenTo.usdPrice
                      : '--'}{' '}
                    USD
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width="100%" p="xl" display="flex" flexDirection="column">
        <SwapPreviewModalSummary />
        <SwapButton />
      </Box>
    </Box>
  );
};

export default SwapPreviewModal;
