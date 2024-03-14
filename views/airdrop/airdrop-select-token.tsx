import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath, TOKEN_ICONS } from '@/lib';
import { ChevronRightSVG, DefaultTokenSVG } from '@/svg';

import SelectTokenModal from '../components/select-token-modal';
import { CoinDataWithChainInfo } from '../components/select-token-modal/select-token-modal.types';
import { IAirdropForm } from './airdrop.types';

const BOX_ID = 'dropdown-id';

const AirdropSelectToken: FC = () => {
  const { network } = useNetwork();
  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });

  const onSelect = async ({
    decimals,
    symbol,
    type,
    balance,
  }: CoinDataWithChainInfo) => {
    setValue('decimals', decimals);
    setValue('token', {
      type,
      symbol,
      decimals,
      balance: FixedPointMath.toNumber(BigNumber(balance), decimals),
    });
    handleClose();
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal
          closeModal={handleClose}
          onSelect={onSelect}
          simple
          wallet
        />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  const renderToken = () => {
    if (!token) return null;
    const TokenIcon = TOKEN_ICONS[network][token.symbol] ?? DefaultTokenSVG;
    return (
      <Box
        display="flex"
        bg="onSurface"
        color="surface"
        height="1.8rem"
        minWidth="1.8rem"
        borderRadius="xs"
        alignItems="center"
        justifyContent="center"
      >
        <TokenIcon maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
    );
  };

  return (
    <Box position="relative" id={BOX_ID}>
      <Box
        p="s"
        gap="xs"
        display="flex"
        minWidth="8rem"
        cursor="pointer"
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        borderColor="outlineVariant"
        onClick={openModal}
      >
        {renderToken()}
        <Typography
          flex="1"
          as="span"
          size="large"
          variant="label"
          color="onSurface"
        >
          {token?.symbol || '---'}
        </Typography>
        <Box rotate="90deg" color="onSurface">
          <ChevronRightSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default AirdropSelectToken;
