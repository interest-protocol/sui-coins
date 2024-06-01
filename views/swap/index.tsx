import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';

import Input from './input';
import SwapFormFieldSlider from './input/swap-manager-slider';
import ManageSlippage from './manage-slippage';
import SwapFlipToken from './swap-flip-token';
import SwapHeader from './swap-header';
import SwapManager from './swap-manager';
import SwapPath from './swap-manager/swap-path';
import SwapPreviewButton from './swap-preview-button';

const Swap: FC = () => (
  <Layout>
    <Box
      mx="auto"
      mt="3.5rem"
      display="flex"
      borderRadius="l"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      px={['2xs', 'xl', 'xl', '7xl']}
      width={['100%', '100%', '100%', '39.75rem']}
    >
      <Box bg="container" borderRadius="s" p="xl">
        <SwapHeader />
        <Box display="flex" flexDirection="column" gap="5xl">
          <Input
            label="from"
            slider={
              <Box px="s">
                <SwapFormFieldSlider />
              </Box>
            }
          />
        </Box>
        <Box
          display="flex"
          position="relative"
          alignContent="center"
          justifyContent="center"
        >
          <Box width="100%" height="0.313rem" bg="lowContainer" />
          <Box
            gap="s"
            my="-1.5rem"
            width="100%"
            display="flex"
            position="absolute"
            alignItems="center"
            justifyContent="center"
          >
            {[<SwapFlipToken key={v4()} />].map((button) => (
              <Box
                key={v4()}
                display="flex"
                width="3.25rem"
                height="3.25rem"
                border="5px solid"
                alignItems="center"
                borderRadius="full"
                justifyContent="center"
                borderColor="lowContainer"
              >
                {button}
              </Box>
            ))}
          </Box>
        </Box>
        <Box py="xl" borderRadius="xs" bg="container" my="m">
          <Input label="to" />
        </Box>
        <SwapPreviewButton />
      </Box>
      <SwapPath />
      <Box my="xs" bg="container" borderRadius="s">
        <ManageSlippage />
      </Box>
    </Box>
    <SwapManager />
  </Layout>
);

export default Swap;
