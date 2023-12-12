import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form';

import { COINS_SVG_MAP_V2 } from '@/constants/coins';
import { SwapArrowSVG } from '@/svg';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPath: FC = () => {
  const formSwap: UseFormReturn<SwapForm> = useFormContext();

  const readyToSwap = useWatch({
    control: formSwap.control,
    name: 'readyToSwap',
  });
  const swapPath = useWatch({ control: formSwap.control, name: 'swapPath' });

  if (!readyToSwap || !swapPath || !swapPath.length)
    return (
      <Box
        p="l"
        mt="xl"
        gap="xl"
        mx="auto"
        height="4rem"
        borderRadius="m"
        color="onSurface"
        alignItems="center"
        bg="lowestContainer"
        display="inline-flex"
        justifyContent="center"
      />
    );

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
      mt="xl"
      gap="xl"
      mx="auto"
      bg="surface"
      borderRadius="m"
      color="onSurface"
      alignItems="center"
      display="inline-flex"
      justifyContent="center"
    >
      <CoinInIcon
        width="100%"
        height="100%"
        maxWidth="1.5rem"
        maxHeight="1.5rem"
      />
      <SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />
      {baseToken && (
        <>
          <BaseTokenIcon
            width="100%"
            height="100%"
            maxWidth="1.5rem"
            maxHeight="1.5rem"
          />
          <SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />
        </>
      )}
      <CoinOutIcon
        width="100%"
        height="100%"
        maxWidth="1.5rem"
        maxHeight="1.5rem"
      />
    </Box>
  );
};

export default SwapPath;
