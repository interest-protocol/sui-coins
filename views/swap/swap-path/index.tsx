import { Box, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { COIN_TYPE_TO_SYMBOL, SUI_TYPE_ARG_LONG } from '@/constants/coins';
import { AftermathSVG, SwapArrowSVG } from '@/svg';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPath: FC = () => {
  const { network } = useSuiClientContext();
  const { control } = useFormContext<SwapForm>();

  const routes = useWatch({ control, name: 'route.routes' });

  if (!routes?.length) return null;

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
      {routes.map(({ paths }) => (
        <Box
          gap="m"
          key={v4()}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="label" size="small">
            {(+(100 / routes.length).toFixed(1)).toPrecision()}%
          </Typography>
          {paths?.map(({ coinIn, coinOut, protocolName }, index) => [
            !index ? (
              <TokenIcon
                key={v4()}
                network={network as Network}
                type={
                  coinIn.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinIn.type
                }
                symbol={
                  COIN_TYPE_TO_SYMBOL[network as Network][
                    coinIn.type === SUI_TYPE_ARG_LONG
                      ? SUI_TYPE_ARG
                      : coinIn.type
                  ]
                }
              />
            ) : null,
            <Box key={v4()}>
              <Typography variant="label" size="small">
                {protocolName}
              </Typography>
              <SwapArrowSVG width="100%" maxWidth="5rem" maxHeight="0.75rem" />
            </Box>,
            <TokenIcon
              key={v4()}
              network={network as Network}
              type={
                coinOut.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinOut.type
              }
              symbol={
                COIN_TYPE_TO_SYMBOL[network as Network][
                  coinOut.type === SUI_TYPE_ARG_LONG
                    ? SUI_TYPE_ARG
                    : coinOut.type
                ]
              }
            />,
          ])}
        </Box>
      ))}
      <a
        target="_blank"
        rel="noopener, noreferrer"
        href="https://aftermath.finance"
      >
        <Box
          gap="2xs"
          display="flex"
          left={['0.75rem', 'unset']}
          right="0.75rem"
          bottom="0.25rem"
          position="absolute"
          alignItems="flex-end"
        >
          <Typography variant="body" size="small">
            Powered by
          </Typography>
          <AftermathSVG width="100%" maxWidth="1.2rem" maxHeight="1.2rem" />
        </Box>
      </a>
    </Box>
  );
};

export default SwapPath;
