import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useModal } from '@/hooks/use-modal';
import { ChevronRightSVG } from '@/svg';
import SelectTokenModal from '@/views/components/select-token-modal';

import { SwapForm } from '../swap.types';
import { SelectTokenProps } from './input.types';

const SelectToken: FC<SelectTokenProps> = ({ label }) => {
  const { setModal, handleClose } = useModal();

  const { setValue } = useFormContext<SwapForm>();

  const onSelect = (coin: CoinObject) => {
    setValue(label, {
      ...coin,
      value: '',
      locked: false,
    });
  };

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
    <Box position="relative">
      <Button
        bg="highestContainer"
        p="m"
        borderRadius="xs"
        variant="tonal"
        fontSize="s"
        onClick={openModal}
      >
        <Typography size="large" variant="label">
          Select token
        </Typography>
        <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      </Button>
    </Box>
  );
};

export default SelectToken;
