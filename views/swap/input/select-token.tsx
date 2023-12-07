import { Box, Button, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { BNBSVG, ChevronRightSVG } from '@/svg';
import SelectTokenModal from '@/views/components/select-token-modal';

import { InputProps as SelectTokenProps } from './input.types';

const SelectToken: FC<SelectTokenProps> = ({ label }) => {
  const { setModal, handleClose } = useModal();

  const { control } = useFormContext();

  const token = useWatch({
    control,
    name: label,
  });

  const openModal = () =>
    setModal(
      <Motion
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.3,
        }}
      >
        <SelectTokenModal closeModal={handleClose} />
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
        pr="1rem"
        pl="0.5rem"
        variant="tonal"
        fontSize="0.875rem"
        onClick={openModal}
        PrefixIcon={
          <Box
            minWidth="1.5rem"
            width="1.5rem"
            height="1.5rem"
            bg="#000"
            color="#fff"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            position="relative"
          >
            <BNBSVG maxWidth="1.125rem" maxHeight="1.125rem" width="100%" />
          </Box>
        }
        SuffixIcon={
          <Box minWidth="1rem">
            <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          </Box>
        }
      >
        {token.symbol}
      </Button>
    </Box>
  );
};

export default SelectToken;
