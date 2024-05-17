import { Box, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { COIN_TYPE_TO_SYMBOL } from '@/constants/coins';
import { SwapArrowSVG } from '@/svg';
import { isSui } from '@/utils';

import { SwapPathLineProps } from './swap-path.types';

const SwapPathLine: FC<SwapPathLineProps> = ({ percentage, paths }) => {
  const { network } = useSuiClientContext();

  return (
    <Box
      gap="m"
      key={v4()}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="label" size="small">
        {(+percentage.toFixed(1)).toPrecision()}%
      </Typography>
      {paths?.map(([coinInType, coinOutType, protocolName], index) => [
        !index ? (
          <TokenIcon
            key={v4()}
            network={network as Network}
            type={isSui(coinInType) ? SUI_TYPE_ARG : coinInType}
            symbol={
              COIN_TYPE_TO_SYMBOL[network as Network][
                isSui(coinInType) ? SUI_TYPE_ARG : coinInType
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
          type={isSui(coinOutType) ? SUI_TYPE_ARG : coinOutType}
          symbol={
            COIN_TYPE_TO_SYMBOL[network as Network][
              isSui(coinOutType) ? SUI_TYPE_ARG : coinOutType
            ]
          }
        />,
      ])}
    </Box>
  );
};

export default SwapPathLine;
