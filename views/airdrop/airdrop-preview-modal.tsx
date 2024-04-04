import { Box, Button, Modal, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Network } from '@/constants/network';
import { useNetwork } from '@/context/network';
import { FixedPointMath } from '@/lib';
import { ArrowLeftSVG, TimesSVG } from '@/svg';
import { formatMoney } from '@/utils';

import { AirdropPreviewModalProps, IAirdropForm } from './airdrop.types';
import AirdropConfirmButton from './airdrop-confirm-button';
import AirdropSummary from './airdrop-summary';

const AirdropPreviewModal: FC<AirdropPreviewModalProps> = ({
  isOpen,
  method,
  onClose,
  setIsProgressView,
}) => {
  const network = useNetwork();
  const { control } = useFormContext<IAirdropForm>();
  const { push } = useRouter();

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

  const handleGoBackToAirdrop = () => {
    push(Routes[RoutesEnum.Airdrop]);
  };

  return (
    <Modal custom isOpen={isOpen}>
      <Box
        maxWidth="100%"
        maxHeight="90vh"
        borderRadius="xs"
        width="26.875rem"
        minHeight="30rem"
        color="onSurface"
        alignItems="center"
        display="inline-flex"
        bg="lowContainer"
        flexDirection="column"
        boxShadow="dropShadow.2xl"
        justifyContent="space-between"
      >
        <Box width="100%">
          <Box
            p="xl"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button variant="text" isIcon onClick={handleGoBackToAirdrop}>
              <ArrowLeftSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
            </Button>
            <Typography size="large" variant="title">
              Airdrop
            </Typography>
            <Button variant="text" isIcon onClick={onClose}>
              <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </Button>
          </Box>
          <Box
            px="xl"
            pb="xl"
            pt="2xs"
            display="flex"
            flexDirection="column"
            justifyContent="start"
          >
            <Typography size="medium" variant="label" mb="xs" color="onSurface">
              You will send
            </Typography>
            <Box
              p="s"
              display="flex"
              color="onSurface"
              borderRadius="xs"
              alignItems="center"
              bg="surface"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap="m">
                <Box
                  width="2.5rem"
                  height="2.5rem"
                  borderRadius="xs"
                  alignItems="center"
                  display="inline-flex"
                  justifyContent="center"
                >
                  <TokenIcon
                    network={network.network}
                    tokenId={network.network === Network.DEVNET ? symbol : type}
                  />
                </Box>
                <Typography size="small" variant="title">
                  {symbol}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography size="medium" variant="body">
                  {formatMoney(total)} {symbol}
                </Typography>
                <Typography variant="body" size="small" color="outlineVariant">
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
    </Modal>
  );
};

export default AirdropPreviewModal;
