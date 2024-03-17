import { Box, Typography } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { COIN_TYPE_TO_SYMBOL, SUI_TYPE_ARG_LONG } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { AftermathSVG, SwapArrowSVG } from '@/svg';
import { SwapForm } from '@/views/swap/swap.types';

const SwapPath: FC = () => {
  const network = useNetwork();
  const { control } = useFormContext<SwapForm>();

  const swapPath = useWatch({ control, name: 'swapPath' });

  if (!swapPath?.length) return null;

  return (
    <Box
      p="l"
      mt="xs"
      gap="xl"
      mx="auto"
      width="100%"
      display="flex"
      color="onSurface"
      borderRadius="xs"
      alignItems="center"
      position="relative"
      bg="lowestContainer"
      justifyContent="center"
    >
      {swapPath?.map(({ coinIn, coinOut, protocolName }, index) => [
        !index ? (
          <TokenIcon
            key={v4()}
            network={network}
            type={
              coinIn.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinIn.type
            }
            symbol={
              COIN_TYPE_TO_SYMBOL[network][
                coinIn.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinIn.type
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
          network={network}
          type={
            coinOut.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinOut.type
          }
          symbol={
            COIN_TYPE_TO_SYMBOL[network][
              coinOut.type === SUI_TYPE_ARG_LONG ? SUI_TYPE_ARG : coinOut.type
            ]
          }
        />,
      ])}
      <a
        target="_blank"
        rel="noopener, noreferrer"
        href="https://aftermath.finance"
      >
        <Box
          gap="2xs"
          display="flex"
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
