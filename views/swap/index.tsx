import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { SwapSVG } from '@/svg';
import { updateURL } from '@/utils';

import Input from './input';
import ManageSlippage from './manage-slippage';
import PreviewSwapButton from './preview-swap-button';
import { SwapForm } from './swap.types';
import SwapManager from './swap-manager';

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
    <Layout title="Trade">
      <Box
        mx="auto"
        display="flex"
        borderRadius="2xl"
        flexDirection="column"
        px={['2xs', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
        <Box
          py="xl"
          my="xs"
          px={['2xs', 'm']}
          borderRadius="xs"
          bg="lowestContainer"
        >
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
                bg="onPrimary"
                color="primary"
                variant="tonal"
                onClick={flipToken}
              >
                <SwapSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box py="xl" px="m" borderRadius="xs" bg="lowestContainer">
          <Input label="to" />
          <PreviewSwapButton />
        </Box>
        <SwapManager />
        <Box my="xs">
          <ManageSlippage />
        </Box>
      </Box>
    </Layout>
  );
};

export default Swap;
