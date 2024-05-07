import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';

import Input from './input';
import Slider from './input/slider';
import ManageSlippage from './manage-slippage';
import PreviewSwapButton from './preview-swap-button';
import SwapFlipToken from './swap-flip-token';
import SwapPath from './swap-path';
import SwapUpdatePrice from './swap-update-price';

const Swap: FC = () => (
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
        <Input
          label="from"
          slider={
            <Box px="s">
              <Slider />
            </Box>
          }
        />
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
          {[<SwapFlipToken key={v4()} />, <SwapUpdatePrice key={v4()} />].map(
            (button) => (
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
            )
          )}
        </Box>
      </Box>
      <Box py="xl" px={['2xs', 'm']} borderRadius="xs" bg="lowestContainer">
        <Input label="to" />
        <PreviewSwapButton />
      </Box>
      <SwapPath />
      <Box my="xs" bg="lowestContainer" borderRadius="xs">
        <ManageSlippage />
      </Box>
    </Box>
  </Layout>
);

export default Swap;
