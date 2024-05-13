import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';

import Input from './input';
import Slider from './input/slider';
import ManageSlippage from './manage-slippage';
import PreviewSwapButton from './preview-swap-button';
import SwapFlipToken from './swap-flip-token';
import SwapHeader from './swap-header';
import SwapPath from './swap-path';
import SwapPoweredBy from './swap-powered-by';
import SwapUpdatePrice from './swap-update-price';

const Swap: FC = () => (
  <Layout>
    <Box
      mx="auto"
      mt="3.5rem"
      display="flex"
      borderRadius="l"
      flexDirection="column"
      px={['2xs', 'xl', 'xl', '7xl']}
      width={['100%', '100%', '100%', '39.75rem']}
    >
      <Box bg="lowestContainer" borderRadius="s" p="xl">
        <SwapHeader />
        <Box py="xl" my="m" borderRadius="xs">
          <Input
            label="from"
            slider={
              <Box px="s">
                <Slider />
              </Box>
            }
          />
        </Box>
        <Box
          position="relative"
          display="flex"
          alignContent="center"
          justifyContent="center"
        >
          <Box width="100%" height="0.188rem" bg="lowContainer" />
          <Box
            gap="s"
            my="-1.7rem"
            width="100%"
            display="flex"
            position="absolute"
            alignItems="center"
            justifyContent="center"
          >
            {[<SwapFlipToken key={v4()} />, <SwapUpdatePrice key={v4()} />].map(
              (button) => (
                <Box
                  key={v4()}
                  display="flex"
                  width="3.25rem"
                  height="3.25rem"
                  borderRadius="full"
                  border="3px solid"
                  alignItems="center"
                  borderColor="lowContainer"
                  justifyContent="center"
                >
                  {button}
                </Box>
              )
            )}
          </Box>
        </Box>
        <Box py="xl" borderRadius="xs" bg="lowestContainer" my="m">
          <Input label="to" />
          <PreviewSwapButton />
        </Box>
        <SwapPoweredBy />
      </Box>
      <SwapPath />
      <Box my="xs">
        <ManageSlippage />
      </Box>
    </Box>
  </Layout>
);

export default Swap;
