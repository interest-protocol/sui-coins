import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { useBlocklist } from '@/hooks/use-blocklist';
import { BurnSVG } from '@/svg';
import { getSymbolByType } from '@/utils';

import { CoinObject } from '../../components/web3-manager/coins-manager/web3-manager.types';
import { IncineratorTokenObjectProps } from './incinerator.types';

const IncineratorTokenObject: FC<IncineratorTokenObjectProps> = ({
  object,
}) => {
  const { data } = useBlocklist();
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
          <Box display="flex" gap="xs">
            <Typography size="medium" variant="body" whiteSpace="nowrap">
              {type === displayName ? formatAddress(type) : displayName}
            </Typography>
            {data?.includes(type) && (
              <Box color="error">
                <BurnSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
              </Box>
            )}
          </Box>
        </TooltipWrapper>
        <Typography
          as="span"
          size="small"
          variant="body"
          color="outline"
          whiteSpace="nowrap"
        >
          Kind: {kind}
        </Typography>
      </Box>
    </Box>
  );
};

export default IncineratorTokenObject;
