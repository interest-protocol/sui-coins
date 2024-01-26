import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useModal } from '@/hooks/use-modal';
import { ChevronRightSVG } from '@/svg';

import SelectTokenModal from '../../components/select-token-modal';
import { IAirdropForm } from '../airdrop.types';
import { getSymbol } from '../airdrop.utils';

const BOX_ID = 'dropdown-id';

const AirdropSelectToken: FC = () => {
  const { network } = useNetwork();
  const { setModal, handleClose } = useModal();
  const { control, setValue } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });

  const onSelect = (coin: CoinObject) => setValue('token', coin);

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal closeModal={handleClose} onSelect={onSelect} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Box position="relative" id={BOX_ID}>
      <Box
        p="xs"
        gap="xs"
        display="flex"
        minWidth="8rem"
        cursor="pointer"
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        onClick={openModal}
        borderColor="outlineVariant"
      >
        {token && (
          <Box
            bg="black"
            color="white"
            display="flex"
            width="2.5rem"
            height="2.5rem"
            borderRadius="xs"
            alignItems="center"
            justifyContent="center"
          >
            <TokenIcon
              network={network}
              tokenId={network === Network.MAINNET ? token.type : token.symbol}
            />
          </Box>
        )}
        <Typography variant="label" size="large" flex="1" as="span">
          {token ? getSymbol(token.symbol, token.type) : '---'}
        </Typography>
        <Box rotate="90deg">
          <ChevronRightSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default AirdropSelectToken;
