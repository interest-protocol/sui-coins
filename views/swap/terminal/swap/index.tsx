import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { LogoSVG } from '@/components/svg';

import Input from './input';
import Slider from './input/slider';
import { SwapForm } from './swap.types';
import SwapButton from './swap-button';
import SwapFlipToken from './swap-flip-token';
import SwapPoweredBy from './swap-powered-by';
import SwapSummary from './swap-summary';
import SwapUpdatePrice from './swap-update-price';
import WalletButton from './wallet-button';

const Swap: FC = () => {
  const { control } = useFormContext<SwapForm>();

  const fixedIn = useWatch({ control, name: 'fixedIn' });
  const fixedOut = useWatch({ control, name: 'fixedOut' });

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap="xs">
          <LogoSVG maxWidth="1.6rem" maxHeight="1.6rem" width="100%" />
          <Typography
            size="small"
            variant="title"
            fontWeight="700"
            color="onSurface"
            width="max-content"
          >
            SUI COINS
          </Typography>
        </Box>
        <WalletButton />
      </Box>
      <Box display="flex" borderRadius="l" flexDirection="column">
        <Box bg="lowestContainer" borderRadius="xs" p="m">
          <Box display="flex" flexDirection="column" gap="xl">
            <Input label="from" slider={<Slider />} />
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
              {fixedIn && fixedOut && (
                <Box
                  key={v4()}
                  display="flex"
                  width="3.25rem"
                  height="3.25rem"
                  border="5px solid"
                  borderRadius="full"
                  alignItems="center"
                  justifyContent="center"
                  borderColor="lowContainer"
                >
                  <SwapFlipToken />
                </Box>
              )}
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
                <SwapUpdatePrice />
              </Box>
            </Box>
          </Box>
          <Box borderRadius="xs" bg="lowestContainer">
            <Input label="to" />
          </Box>
          <SwapSummary />
          <SwapButton />
          <SwapPoweredBy />
        </Box>
      </Box>
    </>
  );
};

export default Swap;
