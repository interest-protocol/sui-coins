import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';
import { SwapSVG } from '@/svg';

import Input from './input';
import ManageSlippage from './manage-slippage';
import { SwapProps } from './swap.types';

const Swap: FC<SwapProps> = ({ formSwap, formSettings }) => {
  const flipToken = () => {
    const tmp = formSwap.getValues('to');
    formSwap.setValue('to', formSwap.getValues('from'));
    formSwap.setValue('from', tmp);
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
        borderRadius="2rem"
        bg="lowestContainer"
        flexDirection="column"
        p={['xl', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
        <Input label="to" formSwap={formSwap} />
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
        <Input label="from" formSwap={formSwap} />
        <ManageSlippage formSettings={formSettings} />
        <Box mt="7xl" mx="auto">
          <Button variant="filled">
            <Typography variant="label" size="large">
              SWAP
            </Typography>
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Swap;
