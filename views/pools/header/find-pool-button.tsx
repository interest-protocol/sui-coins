import {
  Box,
  Button,
  Motion,
  Theme,
  useTheme,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { SearchSVG } from '@/svg';

import FindPoolModal from '../find-pool-modal';
import { PoolForm } from '../pools.types';

const FinPoolButton: FC = () => {
  const { colors } = useTheme() as Theme;
  const { setModal, handleClose } = useModal();

  const form = useFormContext<PoolForm>();

  const openModal = () => {
    form.setValue('tokenList', [
      {
        symbol: '',
        type: '' as `0x${string}`,
        decimals: 0,
        value: '',
        locked: false,
      },
      {
        symbol: '',
        type: '' as `0x${string}`,
        decimals: 0,
        value: '',
        locked: false,
      },
    ]);

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
  };

  return (
    <>
      <Box
        gap="2xs"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <Button
          py="s"
          variant="tonal"
          color="onSurface"
          bg="highContainer"
          onClick={openModal}
          nHover={{
            bg: `${colors.primary}14`,
          }}
          SuffixIcon={
            <Box
              ml="m"
              width="1rem"
              height="1rem"
              display="flex"
              justifyContent="center"
            >
              <SearchSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
        >
          find pool
        </Button>
      </Box>
      <Box gap="xs" display={['flex', 'flex', 'flex', 'none']}>
        <Button
          isIcon
          width="1.5rem"
          bg="onSurface"
          color="surface"
          height="1.5rem"
          variant="filled"
          nHover={{
            bg: 'outline',
          }}
          onClick={openModal}
        >
          <Box height="1.25rem" width="1.25rem">
            <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default FinPoolButton;
