import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { ArrowLeftSVG, TimesSVG } from '@/svg';
import { formatDollars } from '@/utils';

import { SwapForm, SwapPreviewModalProps } from '../swap.types';
import SwapButton from '../swap-button';
import SwapPreviewModalSummary from './swap-preview-modal-summary';

const SwapPreviewModal: FC<SwapPreviewModalProps> = ({ onClose }) => {
  const network = useNetwork();
  const { push } = useRouter();
  const { control } = useFormContext<SwapForm>();

  const handleGoBack = () => {
    push(Routes[RoutesEnum.Swap]);
    onClose();
  };

  const tokenFrom = useWatch({ control, name: 'from' });
  const tokenTo = useWatch({ control, name: 'to' });

  return (
    <Box
      maxWidth="95%"
      borderRadius="xs"
      width="26.875rem"
      minHeight="30rem"
      maxHeight="90vh"
      color="onSurface"
      bg="lowContainer"
      alignItems="center"
      display="inline-flex"
      justifyContent="space-between"
      flexDirection="column"
      boxShadow="dropShadow.2xl"
    >
      <Box width="100%">
        <Box
          p="xl"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button variant="text" isIcon onClick={handleGoBack}>
            <ArrowLeftSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          </Button>
          <Typography size="large" variant="title" color="onSurface">
            Swap
          </Typography>
          <Button variant="text" isIcon onClick={onClose}>
            <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" gap="m">
          <Box
            px="xl"
            display="flex"
            flexDirection="column"
            justifyContent="start"
          >
            <Typography size="medium" variant="label" mb="xs" color="onSurface">
              FROM
            </Typography>
            <Box
              p="s"
              bg="surface"
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
                  <TokenIcon network={network} tokenId={tokenFrom.symbol} />
                </Box>
                <Typography size="small" variant="title">
                  {tokenFrom.symbol}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="body" size="medium" color="onSurface">
                  {tokenFrom.value || 0}
                </Typography>
                <Typography variant="body" size="small" color="outlineVariant">
                  {tokenFrom.usdPrice
                    ? formatDollars(
                        +(
                          Number(tokenFrom.value || 0) * tokenFrom.usdPrice
                        ).toFixed(3)
                      )
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
              <Typography
                size="medium"
                variant="label"
                mb="xs"
                color="onSurface"
              >
                TO (ESTIMATED)
              </Typography>
              <Box
                bg="surface"
                p="s"
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
                    <TokenIcon network={network} tokenId={tokenTo.symbol} />
                  </Box>
                  <Typography size="small" variant="title" color="onSurface">
                    {tokenTo.symbol}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body" size="medium" color="onSurface">
                    {tokenTo.value || 0}
                  </Typography>
                  <Typography
                    variant="body"
                    size="small"
                    color="outlineVariant"
                  >
                    {tokenTo.usdPrice
                      ? formatDollars(
                          +(
                            Number(tokenTo.value || 0) * tokenTo.usdPrice
                          ).toFixed(3)
                        )
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
