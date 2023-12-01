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
    setValue('to', tmpFrom);
    setValue('from', tmpTo);

    updateURL(`${pathname}?from=${tmpTo.type}&to=${tmpFrom.type}`);
  };

  return (
    <Layout>
      <>
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
          borderRadius="2rem"
          bg="lowestContainer"
          flexDirection="column"
          p={['xl', 'xl', 'xl', '7xl']}
          width={['100%', '100%', '100%', '39.75rem']}
        >
          <Input label="from" />
          <Box my="0.25rem" position="relative">
            <Box
              left="45%"
              top="-1.25rem"
              borderRadius="full"
              position="absolute"
              bg="lowestContainer"
            >
              <Button
                isIcon
                variant="outline"
                color="primary"
                onClick={flipToken}
              >
                <SwapSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              </Button>
            </Box>
          </Box>
          <Input label="to" />
          <ManageSlippage />
          <Box mt="7xl" mx="auto">
            <SwapButton />
          </Box>
        </Box>
      </>
      <SwapManager />
    </Layout>
  );
};

export default Swap;
