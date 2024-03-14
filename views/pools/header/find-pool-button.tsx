import { Box, Button, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { SearchSVG } from '@/svg';

import FindPoolModal from '../find-pool-modal';
import { FindPoolForm } from '../find-pool-modal/find-pool-modal.types';

const FinPoolButton: FC = () => {
  const { setModal, handleClose } = useModal();

  const form = useForm<FindPoolForm>({
    defaultValues: {
      tokens: [
        { type: '', symbol: '', decimals: 0 },
        { type: '', symbol: '', decimals: 0 },
      ],
    },
  });

  const openModal = () =>
    setModal(
      <FormProvider {...form}>
        <Motion
          animate={{ scale: 1 }}
          initial={{ scale: 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <FindPoolModal closeModal={handleClose} />
        </Motion>
      </FormProvider>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <>
      <Box
        gap="2xs"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <Button
          py="s"
          bg="onSurface"
          color="surface"
          variant="filled"
          onClick={openModal}
          nHover={{
            bg: 'onPrimaryContainer',
          }}
          SuffixIcon={
            <Box
              display="flex"
              width="0.875rem"
              height="0.875rem"
              justifyContent="center"
            >
              <SearchSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
        >
          Find pool
        </Button>
      </Box>
    </>
  );
};

export default FinPoolButton;
