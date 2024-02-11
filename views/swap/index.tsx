import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { useModal } from '@/hooks/use-modal';
import { SwapSVG } from '@/svg';
import { updateURL } from '@/utils';

import Input from './input';
import ManageSlippage from './manage-slippage';
import { SwapForm } from './swap.types';
import SwapManager from './swap-manager';
import SwapPreviewModal from './swap-preview-modal';

const Swap: FC = () => {
  const { pathname } = useRouter();
  const form = useFormContext<SwapForm>();
  const { setModal, handleClose } = useModal();

  const { getValues, setValue } = form;

  const flipToken = () => {
    const tmpTo = getValues('to');
    const tmpFrom = getValues('from');
    setValue('to', { ...tmpFrom, value: '' });
    setValue('from', { ...tmpTo, value: '' });

    updateURL(`${pathname}?from=${tmpTo.type}&to=${tmpFrom.type}`);
  };

  const handlePreview = () =>
    setModal(
      <FormProvider {...form}>
        <SwapPreviewModal onClose={handleClose} />
      </FormProvider>,
      {
        custom: true,
      }
    );

  return (
    <Layout title="Swap">
      <Box
        mx="auto"
        display="flex"
        borderRadius="2xl"
        flexDirection="column"
        px={['xl', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
        <Box py="xl" px="m" my="xs" borderRadius="xs" bg="lowestContainer">
          <Input label="from" />
          <Box my="0.25rem" position="relative">
            <Box
              left="45%"
              position="absolute"
              border="7px solid"
              borderColor="surface"
              borderRadius="s"
            >
              <Button
                isIcon
                variant="tonal"
                bg="onPrimary"
                color="primary"
                onClick={flipToken}
              >
                <SwapSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box py="xl" px="m" borderRadius="xs" bg="lowestContainer">
          <Input label="to" />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="l"
            mb="l"
          >
            <Button
              px="l"
              py="s"
              fontSize="s"
              opacity="0.4"
              bg="container"
              variant="tonal"
              color="onSurface"
              borderRadius="xs"
              onClick={handlePreview}
            >
              Preview swap
            </Button>
          </Box>
        </Box>
        <Box my="xs">
          <ManageSlippage />
        </Box>
      </Box>
      <SwapManager />
    </Layout>
  );
};

export default Swap;
