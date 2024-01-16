import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { SwapSVG } from '@/svg';
import { updateURL } from '@/utils';

import Input from './input';
import ManageSlippage from './manage-slippage';
import SwapButton from './swap-button';
import SwapManager from './swap-manager';

const Swap: FC = () => {
  const { pathname } = useRouter();
  const { getValues, setValue } = useFormContext();

  const flipToken = () => {
    const tmpTo = getValues('to');
    const tmpFrom = getValues('from');
    setValue('to', { ...tmpFrom, value: '' });
    setValue('from', { ...tmpTo, value: '' });

    updateURL(`${pathname}?from=${tmpTo.type}&to=${tmpFrom.type}`);
  };

  return (
    <Layout>
      <Box
        my="2xl"
        fontFamily="Proto"
        textAlign="center"
        fontSize={['5xl', '8xl']}
      >
        Swap
      </Box>
      <Box
        mx="auto"
        display="flex"
        borderRadius="2xl"
        flexDirection="column"
        p={['xl', 'xl', 'xl', '7xl']}
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
              bg="container"
              opacity="0.4"
              color="onSurface"
              px="l"
              py="s"
              borderRadius="xs"
              variant="tonal"
              fontSize="s"
            >
              Preview swap
            </Button>
          </Box>
        </Box>
        <ManageSlippage />
        <Box mt="7xl" mx="auto">
          <SwapButton />
        </Box>
      </Box>
      <SwapManager />
    </Layout>
  );
};

export default Swap;
