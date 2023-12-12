import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form';

import { TOKEN_SVG_MAP } from '@/constants/token';
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

  const CoinInIcon = TOKEN_SVG_MAP[coinIn] ?? TOKEN_SVG_MAP.default;

  const CoinOutIcon = TOKEN_SVG_MAP[coinOut] ?? TOKEN_SVG_MAP.default;

  const BaseTokenIcon = TOKEN_SVG_MAP[baseToken] ?? TOKEN_SVG_MAP.default;

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
