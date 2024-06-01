import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { SwapArrowSVG } from '@/svg';
import { getSymbolByType, isSui } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPath: FC = () => {
  const network = useNetwork();
  const formSwap = useFormContext<SwapForm>();

  const readyToSwap = useWatch({
    control: formSwap.control,
    name: 'readyToSwap',
  });
  const swapPath = useWatch({
    control: formSwap.control,
    name: 'routeWithAmount',
  });

  if (!readyToSwap || !swapPath || !swapPath.length) return null;

  const [coinsPath, ,] = swapPath;

  const coinIn = coinsPath[0];
  const baseTokens = coinsPath.slice(1, -1);
  const coinOut = coinsPath[coinsPath.length - 1];

  return (
    <Box
      p="l"
      mt="xs"
      gap="xl"
      mx="auto"
      width="100%"
      display="flex"
      bg="container"
      color="onSurface"
      borderRadius="s"
      alignItems="center"
      justifyContent="center"
    >
      <TokenIcon
        type={coinIn}
        network={network}
        symbol={isSui(coinIn) ? 'MOVE' : getSymbolByType(coinIn)}
      />
      <SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />
      {baseTokens.map((baseToken) => (
        <>
          <TokenIcon
            key={baseToken}
            type={baseToken}
            network={network}
            symbol={isSui(baseToken) ? 'MOVE' : getSymbolByType(baseToken)}
          />
          <SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />
        </>
      ))}
      <TokenIcon
        type={coinOut}
        network={network}
        symbol={isSui(coinOut) ? 'MOVE' : getSymbolByType(coinOut)}
      />
    </Box>
  );
};

export default SwapPath;
