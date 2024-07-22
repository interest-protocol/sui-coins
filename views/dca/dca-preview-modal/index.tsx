import { Box, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { ArrowLeftSVG, TimesSVG } from '@/svg';
import { formatDollars } from '@/utils';

import { DCAForm, DCAPreviewModalProps } from '../dca.types';
import DCAButton from '../dca-button';
import DCAPreviewModalSummary from './dca-preview-modal-summary';

const DCAPreviewModal: FC<DCAPreviewModalProps> = ({ onClose }) => {
  const { network } = useSuiClientContext();
  const { control } = useFormContext<DCAForm>();

  const tokenFrom = useWatch({ control, name: 'from' });

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
          <ArrowLeftSVG
            width="100%"
            onClick={onClose}
            maxWidth="1.5rem"
            maxHeight="1.5rem"
          />
          <Typography size="large" variant="title">
            DCA
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
                  type={tokenFrom.type}
                  symbol={tokenFrom.symbol}
                  network={network as Network}
                />
                <Typography size="small" variant="title">
                  {tokenFrom.symbol}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="body" size="medium">
                  {tokenFrom.display || 0}
                </Typography>
                <Typography variant="body" size="small" color="#000000A3">
                  {tokenFrom.usdPrice
                    ? formatDollars(
                        +(
                          Number(tokenFrom.display || 0) * tokenFrom.usdPrice
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
      <Box width="100%" p="xl" display="flex" flexDirection="column">
        <DCAPreviewModalSummary />
        <DCAButton />
      </Box>
    </Box>
  );
};

export default DCAPreviewModal;
