import { Box, Modal, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { Dispatch, FC, SetStateAction } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { ArrowLeftSVG, IPXRoundedSVG, TimesSVG } from '@/svg';

import { IAirdropForm } from './airdrop.types';
import { getSymbol } from './airdrop.utils';
import AirdropButton from './airdrop-button';
import AirdropSummary from './airdrop-summary';

interface SummaryModalProps {
  method: string;
  isOpen: boolean;
  onClose: () => void;
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

const AirdropSummaryModal: FC<SummaryModalProps> = ({
  isOpen,
  setIsProgressView,
  onClose,
  method,
}) => {
  const { control } = useFormContext<IAirdropForm>();

  const { symbol, decimals, type } = useWatch({ control, name: 'token' });
  const airdropList = useWatch({ control, name: 'airdropList' });

  return (
    <Modal custom isOpen={isOpen}>
      <Box
        maxWidth="95%"
        borderRadius="xs"
        width="26.875rem"
        minHeight="46rem"
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
            borderColor="black"
            borderBottom="1px dashed"
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
              bg="#EDEDF1"
              p="0.75rem"
              borderRadius="xs"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Box
                  p="s"
                  bg="#000"
                  maxWidth="2.5rem"
                  borderRadius="xs"
                  maxHeight="2.5rem"
                  marginRight="1rem"
                  display="inline-flex"
                >
                  <IPXRoundedSVG
                    width="100%"
                    maxWidth="1.66669rem"
                    maxHeight="1.66669rem"
                  />
                </Box>
                <Typography size={'small'} variant={'title'}>
                  SUI
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography size="medium" variant="body">
                  {airdropList
                    ? FixedPointMath.toNumber(
                        airdropList?.reduce(
                          (acc, { amount }) => acc.plus(BigNumber(amount)),
                          BigNumber(0)
                        ),
                        decimals
                      )
                    : 0}{' '}
                  {getSymbol(symbol, type)}
                </Typography>
                <Typography variant="body" size="small" color="#000000A3">
                  -- USD
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" p="xl">
          <Box mb="m">
            <AirdropSummary method={method} />
          </Box>
          <AirdropButton setIsProgressView={setIsProgressView} />
        </Box>
      </Box>
    </Modal>
  );
};

export default AirdropSummaryModal;
