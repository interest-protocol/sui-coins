import { Box, Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { getSymbolByType } from '@/utils';

import { IncineratorTokenObjectProps } from './incinerator.types';

const IncineratorTokenObject: FC<IncineratorTokenObjectProps> = ({
  object,
}) => {
  const network = useNetwork();
  const { display, type, kind } = object;
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
        size="1.6rem"
        symbol={symbol}
        {...(url ? { url } : { type: coinType, network })}
      />
      <Box>
        <Typography size="medium" variant="body" whiteSpace="nowrap">
          {type === displayName ? formatAddress(type) : displayName}
        </Typography>
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
