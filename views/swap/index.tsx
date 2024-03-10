import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { SwapSVG } from '@/svg';
import { updateURL } from '@/utils';

import Input from './input';
import ManageSlippage from './manage-slippage';
import { SwapForm } from './swap.types';
import SwapManager from './swap-manager';
import SwapPath from './swap-manager/swap-path';
import SwapPreviewButton from './swap-preview-button';

const Swap: FC = () => {
  const { pathname } = useRouter();
  const form = useFormContext<SwapForm>();

  const { getValues, setValue } = form;

  const flipToken = () => {
    const tmpTo = getValues('to');
    const tmpFrom = getValues('from');
    setValue('to', { ...tmpFrom, value: '' });
    setValue('from', { ...tmpTo, value: '' });

    updateURL(`${pathname}?from=${tmpTo.type}&to=${tmpFrom.type}`);
  };

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
        <Box py="xl" px="m" my="xs" borderRadius="xs" bg="container">
          <Input label="from" />
          <Box my="0.25rem" position="relative">
            <Box
              left="45%"
              borderRadius="s"
              position="absolute"
              border="7px solid"
              borderColor="surface"
            >
              <Button
                isIcon
                bg="container"
                variant="tonal"
                color="primary"
                onClick={flipToken}
              >
                <SwapSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box py="xl" px="m" borderRadius="xs" bg="container">
          <Input label="to" />
          <Box
            mt="l"
            mb="l"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SwapPreviewButton />
          </Box>
        </Box>
        <SwapPath />
        <Box my="xs">
          <ManageSlippage />
        </Box>
      </Box>
      <SwapManager />
    </Layout>
  );
};

export default Swap;
