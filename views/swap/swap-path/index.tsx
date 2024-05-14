import { Box } from '@interest-protocol/ui-kit';
import { toPairs, values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { SwapForm } from '@/views/swap/swap.types';

import { isAftermathRoute } from '../swap.utils';
import SwapPathLine from './swap-path-line';

const SwapPath: FC = () => {
  const { control } = useFormContext<SwapForm>();

  const route = useWatch({ control, name: 'route' });

  if (!route) return null;

  return (
    <Box
      p="l"
      gap="l"
      mt="xs"
      mx="auto"
      width="100%"
      maxWidth="90vw"
      display="flex"
      color="onSurface"
      borderRadius="xs"
      position="relative"
      bg="lowestContainer"
      alignItems={['unset', 'unset', 'center']}
      flexDirection="column"
      flexWrap="wrap"
      overflowX="auto"
    >
      {isAftermathRoute(route)
        ? route.routes.map(({ paths }) => (
            <SwapPathLine
              key={v4()}
              percentage={100 / route.routes.length}
              paths={paths.map(({ coinIn, coinOut, protocolName }) => [
                coinIn.type,
                coinOut.type,
                protocolName as string,
              ])}
            />
          ))
        : toPairs(route.trade.edges).map(([final, path]) => (
            <SwapPathLine
              key={v4()}
              percentage={100 / values(route.trade.edges).length}
              paths={[...path, final].map((type) => [
                route.trade.nodes[type].amount_in.token as string,
                route.trade.nodes[type].amount_out.token as string,
                route.trade.nodes[type].pool.sui_exchange as string,
              ])}
            />
          ))}
    </Box>
  );
};

export default SwapPath;
