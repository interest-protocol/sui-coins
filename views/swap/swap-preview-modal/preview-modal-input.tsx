import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Network, TOKEN_ICONS } from '@/constants';
import { useNetwork } from '@/context/network';
import { formatDollars } from '@/utils';

import { SwapForm } from '../swap.types';
import PreviewModalHeader from './preview-modal-header';
import { PreviewModalInputProps } from './swap-preview-modal.types';

const PreviewModalInput: FC<PreviewModalInputProps> = ({
  label,
  alternativeText,
}) => {
  const { network } = useNetwork();
  const isMainnet = Network.MAINNET === network;

  const { control } = useFormContext<SwapForm>();

  const currentToken = useWatch({
    control,
    name: label,
  });

  const {
    symbol: currentSymbol,
    type: currentType,
    balance: currentBalance,
    value: currentValue,
  } = currentToken;

  const Icon = TOKEN_ICONS[network][isMainnet ? currentType : currentSymbol];
  return (
    <Box p="m" pt="2xs">
      <PreviewModalHeader label={label} alternativeText={alternativeText} />
      <Box
        p="s"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bg="#F8F9FD"
        borderRadius="xs"
        mt="s"
        height="4rem"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            bg="onSurface"
            color="onPrimary"
            width="2.5rem"
            height="2.5rem"
            borderRadius="xs"
            alignItems="center"
            display="inline-flex"
            justifyContent="center"
          >
            {Icon && (
              <Icon
                width="100%"
                height="100%"
                maxWidth="1rem"
                maxHeight="1rem"
              />
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDirection="column"
            mx="m"
          >
            <Typography variant="body" size="large">
              {currentSymbol}
            </Typography>
            <Typography variant="body" size="small" color="outline">
              {currentSymbol}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          flexDirection="column"
        >
          <Typography variant="title" size="large">
            {currentBalance}
          </Typography>
          <Typography variant="body" size="small" color="outline">
            {formatDollars(Number(currentValue ?? '0'))} USD
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewModalInput;
