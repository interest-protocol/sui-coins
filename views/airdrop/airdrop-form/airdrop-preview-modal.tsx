import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { FixedPointMath } from '@/lib';
import { ArrowLeftSVG, TimesSVG } from '@/svg';
import { formatMoney } from '@/utils';

import { AirdropPreviewModalProps, IAirdropForm } from '../airdrop.types';
import { getSymbol } from '../airdrop.utils';
import AirdropConfirmButton from './airdrop-confirm-button';
import AirdropSummary from './airdrop-summary';

const AirdropPreviewModal: FC<AirdropPreviewModalProps> = ({
  method,
  onClose,
  setIsProgressView,
}) => {
  const { network } = useNetwork();
  const { control } = useFormContext<IAirdropForm>();

  const { symbol, decimals, type } = useWatch({ control, name: 'token' });
  const usdPrice = useWatch({ control, name: 'tokenUSDPrice' });
  const airdropList = useWatch({ control, name: 'airdropList' });

  const total = airdropList
    ? FixedPointMath.toNumber(
        airdropList?.reduce(
          (acc, { amount }) => acc.plus(BigNumber(amount)),
          BigNumber(0)
        ),
        decimals
      )
    : 0;

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
            Airdrop
          </Typography>
          <TimesSVG
            onClick={onClose}
            width="100%"
            maxWidth="1rem"
            cursor="pointer"
            maxHeight="1rem"
          />
        </Box>
        <Box
          px="xl"
          pb="xl"
          pt="2xs"
          display="flex"
          flexDirection="column"
          justifyContent="start"
        >
          <Typography size="medium" variant="label" mb="xs">
            You will send
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
              <TokenIcon type={type} symbol={symbol} network={network} />
              <Typography size="small" variant="title">
                {symbol}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography size="medium" variant="body">
                {formatMoney(total)} {getSymbol(symbol, type)}
              </Typography>
              <Typography variant="body" size="small" color="#000000A3">
                {usdPrice ? formatMoney(usdPrice * total) : '--'} USD
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width="100%" p="xl">
        <AirdropSummary method={method} />
        <AirdropConfirmButton setIsProgressView={setIsProgressView} />
      </Box>
    </Box>
  );
};

export default AirdropPreviewModal;
