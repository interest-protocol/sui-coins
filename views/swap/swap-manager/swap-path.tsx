import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { ChevronDownSVG, SwapArrowSVG, SwapSVG } from '@/svg';
import { getSymbolByType, isSui } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPath: FC = () => {
  const [isOpen, setOpen] = useState(false);
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

  const {
    to: { symbol: toSymbol, value: toDisplay },
    from: { symbol: fromSymbol, value: fromDisplay },
  } = formSwap.getValues();

  if (!readyToSwap || !swapPath || !swapPath.length) return null;

  const [coinsPath, ,] = swapPath;

  const coinIn = coinsPath[0];
  const baseTokens = coinsPath.slice(1, -1);
  const coinOut = coinsPath[coinsPath.length - 1];

  return (
    <>
      <Box
        p="l"
        gap="l"
        mt="xs"
        mx="auto"
        width="100%"
        display="flex"
        maxWidth="90vw"
        flexWrap="wrap"
        overflowX="auto"
        color="onSurface"
        borderRadius="xs"
        position="relative"
        bg="container"
        flexDirection="column"
        alignItems={['unset', 'unset', 'center']}
      >
        <Box
          width="100%"
          display="flex"
          gap="m"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body" size="medium">
            {!!(
              toDisplay &&
              Number(toDisplay) &&
              fromDisplay &&
              Number(fromDisplay)
            ) && (
              <>
                {' '}
                1 {fromSymbol} = {(+toDisplay / +fromDisplay).toPrecision(6)}{' '}
                {toSymbol}
              </>
            )}
          </Typography>
          <Box rotate="90deg">
            <SwapSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </Box>
          <Button
            px="m"
            variant="filled"
            textAlign="center"
            borderRadius="full"
            onClick={() => setOpen(not)}
            bg={isOpen ? 'onSurface' : 'highestContainer'}
            color={isOpen ? 'surface' : 'onSurface'}
            nHover={{
              bg: 'outline',
              color: isOpen ? 'surface' : 'onSurface',
            }}
            SuffixIcon={
              <Motion
                as="span"
                height="1rem"
                animate={{ rotate: isOpen ? '180deg' : '0deg' }}
              >
                <ChevronDownSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
              </Motion>
            }
          >
            1 Splits & {coinsPath.length - 1} Hops
          </Button>
        </Box>
      </Box>
      {isOpen && (
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
          {baseTokens.flatMap((baseToken) => [
            <TokenIcon
              key={v4()}
              type={baseToken}
              network={network}
              symbol={isSui(baseToken) ? 'MOVE' : getSymbolByType(baseToken)}
            />,
            <SwapArrowSVG
              key={v4()}
              width="100%"
              maxWidth="5rem"
              maxHeight="0.75rem"
            />,
          ])}
          <TokenIcon
            type={coinOut}
            network={network}
            symbol={isSui(coinOut) ? 'MOVE' : getSymbolByType(coinOut)}
          />
        </Box>
      )}
    </>
  );
};

export default SwapPath;
