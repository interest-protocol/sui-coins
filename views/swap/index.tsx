import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { SwapSVG } from '@/svg';
import { updateURL } from '@/utils';

import Input from './input';
import ManageSlippage from './manage-slippage';
import PreviewSwapButton from './preview-swap-button';
import { SwapForm } from './swap.types';
import SwapPath from './swap-path';
import SwapUpdatePrice from './swap-update-price';

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
        </Box>
        <Box position="relative">
          <Box
            px="xl"
            my="-2rem"
            width="100%"
            display="flex"
            position="absolute"
            alignItems="center"
            justifyContent="space-between"
          >
            {[
              <Button
                isIcon
                key={v4()}
                bg="onPrimary"
                width="1.5rem"
                height="1.5rem"
                color="primary"
                variant="filled"
                onClick={flipToken}
                nHover={{ bg: 'lowContainer' }}
              >
                <SwapSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Button>,
              <SwapUpdatePrice key={v4()} />,
            ].map((button) => (
              <Box
                key={v4()}
                display="flex"
                width="3.25rem"
                height="3.25rem"
                borderRadius="s"
                border="6px solid"
                alignItems="center"
                borderColor="surface"
                justifyContent="center"
              >
                {button}
              </Box>
            ))}
          </Box>
        </Box>
        <Box py="xl" px="m" borderRadius="xs" bg="lowestContainer">
          <Input label="to" />
          <PreviewSwapButton />
        </Box>
        <SwapPath />
        <Box my="xs">
          <ManageSlippage />
        </Box>
      </Box>
    </Layout>
  );
};

export default Swap;
