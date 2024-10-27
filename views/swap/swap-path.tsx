import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { ChevronDownSVG, SwapSVG } from '@/svg';
import { SwapForm } from '@/views/swap/swap.types';

import { isNativeRoute } from './swap.utils';
import SwapPathLine from './swap-path-line';

const SwapPath: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const { control, getValues } = useFormContext<SwapForm>();

  const route = useWatch({ control, name: 'route' });

  if (!route) return null;

  const {
    to: { symbol: toSymbol, display: toDisplay },
    from: { symbol: fromSymbol, display: fromDisplay },
  } = getValues();

  const [splits, hops] = isNativeRoute(route)
    ? route.routes.reduce(
        ([a, b], [paths]) => [a + 1, b + paths.length],
        [0, 0]
      )
    : route.routes.reduce(
        ([a, b], { paths }) => [a + 1, b + paths.length],
        [0, 0]
      );

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
        bg="lowestContainer"
        flexDirection="column"
        alignItems={['unset', 'unset', 'center']}
      >
        <Box
          width="100%"
          display="flex"
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
            borderRadius="full"
            onClick={() => setOpen(not)}
            bg={isOpen ? 'onSurface' : 'container'}
            color={isOpen ? 'surface' : 'onSurface'}
            nHover={{
              bg: isOpen ? 'outline' : 'highContainer',
              color: isOpen ? 'surface' : 'onSurface',
            }}
            nActive={{
              bg: isOpen ? 'outline' : 'highContainer',
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
            {splits} Splits & {hops} Hops
          </Button>
        </Box>
      </Box>
      {isOpen && (
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
          bg="lowestContainer"
          flexDirection="column"
          alignItems={['unset', 'unset', 'center']}
        >
          {isNativeRoute(route)
            ? route.routes.map(([paths], index) => (
                <SwapPathLine
                  key={v4()}
                  position={index + 1}
                  paths={paths
                    .slice(0, -1)
                    .map((path, index) => [
                      path as string,
                      paths[index + 1] as string,
                      'IPX CLAMM',
                    ])}
                />
              ))
            : route.routes.map(({ paths }, index) => (
                <SwapPathLine
                  key={v4()}
                  position={index + 1}
                  paths={paths.map(({ coinIn, coinOut, protocolName }) => [
                    coinIn.type,
                    coinOut.type,
                    protocolName as string,
                  ])}
                />
              ))}
        </Box>
      )}
    </>
  );
};

export default SwapPath;
