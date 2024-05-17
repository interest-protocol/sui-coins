import { Box } from '@interest-protocol/ui-kit';
import { toPairs, values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { SwapForm } from '@/views/swap/swap.types';

import { isAftermathRoute } from './swap.utils';
import { isNativeRoute } from './swap.utils';
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
      {isNativeRoute(route) ? (
        route.routes.map(([paths]) => (
          <SwapPathLine
            key={v4()}
            percentage={100}
            paths={paths
              .slice(0, -1)
              .map((path, index) => [
                path as string,
                paths[index + 1] as string,
                'IPX CLAMM',
              ])}
          />
        ))
      ) : isAftermathRoute(route) ? (
        route.routes.map(({ paths }) => (
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
      ) : !toPairs(route.trade.edges).length ? (
        <SwapPathLine
          key={v4()}
          percentage={100}
          paths={[
            [
              values(route.trade.nodes)[0].amount_in.token as string,
              values(route.trade.nodes)[0].amount_out.token as string,
              values(route.trade.nodes)[0].pool.sui_exchange as string,
            ],
          ]}
        />
      ) : (
        toPairs(route.trade.edges).map(([final, path]) => (
          <SwapPathLine
            key={v4()}
            percentage={100 / values(route.trade.edges).length}
            paths={[...path, final].map((type) => [
              route.trade.nodes[type].amount_in.token as string,
              route.trade.nodes[type].amount_out.token as string,
              route.trade.nodes[type].pool.sui_exchange as string,
            ])}
          />
        ))
      )}
    </Box>
  );
};

export default SwapPath;
