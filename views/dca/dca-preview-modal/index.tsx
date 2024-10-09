import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/hooks/use-network';
import { ArrowLeftSVG, TimesSVG } from '@/svg';

import { DCAForm, DCAPreviewModalProps } from '../dca.types';
import DCAButton from '../dca-button';
import DCAPreviewModalSummary from './dca-preview-modal-summary';

const DCAPreviewModal: FC<DCAPreviewModalProps> = ({ onClose }) => {
  const network = useNetwork();
  const { control } = useFormContext<DCAForm>();

  const tokenFrom = useWatch({ control, name: 'from' });
  const tokenTo = useWatch({ control, name: 'to' });
  const price = useWatch({ control, name: 'price' });

  const receiveValue = Number(tokenFrom.display) * Number(price) || 0;

  return (
    <Box
      maxWidth="100%"
      overflow="auto"
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
          cursor="pointer"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button isIcon variant="text" cursor="pointer" onClick={onClose}>
            <ArrowLeftSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
          </Button>
          <Typography size="large" variant="title">
            DCA
          </Typography>
          <Button isIcon variant="text" cursor="pointer" onClick={onClose}>
            <TimesSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" gap="m">
          <Box
            px="xl"
            display="flex"
            flexDirection="column"
            justifyContent="start"
          >
            <Typography size="medium" variant="label" mb="xs">
              Pay
            </Typography>
            <Box
              p="s"
              bg="surface"
              display="flex"
              borderRadius="xs"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap="m">
                <TokenIcon
                  withBg
                  network={network}
                  type={tokenFrom.type}
                  url={tokenFrom.logoUrl}
                  symbol={tokenFrom.symbol}
                />
                <Typography size="small" variant="title">
                  {tokenFrom.symbol}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="body" size="medium">
                  {tokenFrom.display || 0}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            px="xl"
            display="flex"
            flexDirection="column"
            justifyContent="start"
          >
            <Typography size="medium" variant="label" mb="xs">
              Receive
            </Typography>
            <Box
              p="s"
              bg="surface"
              display="flex"
              borderRadius="xs"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap="m">
                <TokenIcon
                  withBg
                  network={network}
                  type={tokenTo.type}
                  url={tokenTo.logoUrl}
                  symbol={tokenTo.symbol}
                />
                <Typography size="small" variant="title">
                  {tokenTo.symbol}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="body" size="medium">
                  ~
                  {receiveValue.toString().includes('e')
                    ? receiveValue.toFixed(10).replace(/\.?0+$/, '')
                    : receiveValue}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width="100%" p="xl" display="flex" flexDirection="column">
        <DCAPreviewModalSummary />
        <DCAButton />
      </Box>
    </Box>
  );
};

export default DCAPreviewModal;
