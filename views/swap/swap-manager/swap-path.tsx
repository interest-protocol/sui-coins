import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form';

import { COINS_SVG_MAP_V2 } from '@/constants/coins';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPathComponent: FC = () => {
  const formSwap: UseFormReturn<SwapForm> = useFormContext();

  const swapPath = useWatch({ control: formSwap.control, name: 'swapPath' });

  if (!swapPath || !swapPath.length) return null;

  const coinIn = swapPath[0].coinIn;
  const baseToken = swapPath.length == 2 ? swapPath[0].coinOut : '';
  const coinOut =
    swapPath.length == 1 ? swapPath[0].coinOut : swapPath[1].coinOut;

  const CoinInIcon = COINS_SVG_MAP_V2[coinIn] ?? COINS_SVG_MAP_V2.default;

  const CoinOutIcon = COINS_SVG_MAP_V2[coinOut] ?? COINS_SVG_MAP_V2.default;

  const BaseTokenIcon = COINS_SVG_MAP_V2[baseToken] ?? COINS_SVG_MAP_V2.default;

  return (
    <Box
      p="l"
      gap="xl"
      borderRadius="m"
      color="onSurface"
      alignItems="center"
      display="inline-flex"
      bg="surface.container"
      justifyContent="center"
    >
      <CoinInIcon
        width="100%"
        height="100%"
        maxWidth="2.5rem"
        maxHeight="2.5rem"
      />
      {/*<SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />*/}
      {baseToken && (
        <>
          <BaseTokenIcon
            width="100%"
            height="100%"
            maxWidth="2.5rem"
            maxHeight="2.5rem"
          />
          {/*<SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />*/}
        </>
      )}
      <CoinOutIcon
        width="100%"
        height="100%"
        maxWidth="2rem"
        maxHeight="2rem"
      />
    </Box>
  );
};

export default SwapPathComponent;
