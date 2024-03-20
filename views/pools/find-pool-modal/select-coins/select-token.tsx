import { Box, Modal, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { useNetwork } from '@/context/network';
import { CoinData } from '@/interface';
import { ChevronDownSVG, ChevronRightSVG } from '@/svg';
import SelectTokenModal from '@/views/components/select-token-modal';

import { FindPoolForm, SelectTokenProps } from '../find-pool-modal.types';

const SelectToken: FC<SelectTokenProps> = ({ index }) => {
  const { network } = useNetwork();
  const [isOpen, setIsOpen] = useState(false);

  const { setValue, control, getValues } = useForm<FindPoolForm>();

  const currentSymbol = useWatch({
    control,
    name: `tokens.${index}.symbol`,
  });

  const onSelect = async ({ type, decimals, symbol }: CoinData) => {
    if (getValues('tokens')?.some((token) => token.type === type)) return;

    setValue(`tokens.${index}`, {
      type,
      symbol,
      decimals,
    });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Box
        p="2xs"
        width="100%"
        display="flex"
        color="onSurface"
        borderRadius="xs"
        border="1px solid"
        alignItems="center"
        onClick={openModal}
        borderColor="outlineVariant"
        justifyContent="space-between"
      >
        {currentSymbol ? (
          <Box display="flex" alignItems="center" gap="m" p="xs">
            <TokenIcon network={network} tokenId={currentSymbol} />
            <Typography variant="body" size="medium">
              {currentSymbol}
            </Typography>
          </Box>
        ) : (
          <Typography size="large" variant="body" p="xs">
            Select Token
          </Typography>
        )}
        {currentSymbol ? (
          <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        ) : (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Box>
      <Modal
        {...{
          isOpen,
          custom: true,
          opaque: false,
          allowClose: true,
          onClose: closeModal,
        }}
      >
        <Motion
          animate={{ scale: 1 }}
          initial={{ scale: 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <SelectTokenModal closeModal={closeModal} onSelect={onSelect} />
        </Motion>
      </Modal>
    </>
  );
};

export default SelectToken;
