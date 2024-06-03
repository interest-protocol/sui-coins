import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { getSymbolByType } from '@/utils';

import { CoinObject } from '../../components/web3-manager/coins-manager/web3-manager.types';
import { IncineratorTokenObjectProps } from './incinerator.types';

const IncineratorTokenObject: FC<IncineratorTokenObjectProps> = ({
  object,
}) => {
  const { display, type, kind } = object;
  const { network } = useSuiClientContext();
  const displayName = display
    ? (display as Record<string, string>).name ?? display.symbol ?? type
    : type;

  const { symbol, type: coinType } = (display as CoinObject) ?? {
    type,
    symbol: getSymbolByType(type),
  };

  const url = (display as Record<string, string>)?.image_url;

  return (
    <Box display="flex" gap="s" alignItems="center">
      <TokenIcon
        withBg
        url={url}
        size="1.6rem"
        type={coinType}
        symbol={symbol}
        network={network as Network}
      />
      <Box>
        <TooltipWrapper
          bg="highContainer"
          maxWidth="20rem"
          wordWrap="break-word"
          tooltipContent={type}
          tooltipPosition="top"
        >
          <Typography size="medium" variant="body" whiteSpace="nowrap">
            {type === displayName ? formatAddress(type) : displayName}
          </Typography>
        </TooltipWrapper>
        <Typography
          as="span"
          size="small"
          variant="body"
          color="outline"
          whiteSpace="nowrap"
        >
          Type: {kind}
        </Typography>
      </Box>
    </Box>
  );
};

export default IncineratorTokenObject;
