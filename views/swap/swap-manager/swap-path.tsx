import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { COIN_TYPE_TO_SYMBOL } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { SwapArrowSVG } from '@/svg';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPath: FC = () => {
  const network = useNetwork();
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
      <TokenIcon
        tokenId={
          network === Network.MAINNET
            ? coinIn
            : COIN_TYPE_TO_SYMBOL[network][coinIn]
        }
        maxWidth="1.5rem"
        maxHeight="1.5rem"
        network={network}
      />
      <SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />
      {baseToken && (
        <>
          <TokenIcon
            tokenId={
              network === Network.MAINNET
                ? baseToken
                : COIN_TYPE_TO_SYMBOL[network][baseToken]
            }
            maxWidth="1.5rem"
            maxHeight="1.5rem"
            network={network}
          />
          <SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />
        </>
      )}
      <TokenIcon
        tokenId={
          network === Network.MAINNET
            ? coinOut
            : COIN_TYPE_TO_SYMBOL[network][coinOut]
        }
        maxWidth="1.5rem"
        maxHeight="1.5rem"
        network={network}
      />
    </Box>
  );
};

export default SwapPath;
