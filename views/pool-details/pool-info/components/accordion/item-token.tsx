import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';

import { PoolDetailAccordionItemCoinProps } from './accordion.types';

const ItemCoin: FC<PoolDetailAccordionItemCoinProps> = ({
  coinName,
  percentage,
  conversion,
  value,
  type,
  symbol,
}) => {
  const { network } = useSuiClientContext();

  return (
    <Box
      py="l"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" justifyContent="center" gap="xs">
        <TokenIcon
          withBg
          type={type}
          symbol={symbol}
          network={network as Network}
        />
        <Typography size="medium" variant="body" mr="0.5rem">
          {coinName}
        </Typography>
      </Box>
      <Box display="flex">
        <Box textAlign="right">
          <Typography size="large" variant="body">
            {value}
          </Typography>
          {conversion && (
            <Typography size="small" color="outline" variant="body">
              {conversion}
            </Typography>
          )}
        </Box>
        {percentage && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Tag variant="filled" bg="lowContainer" color="onSurface" ml="xs">
              <Typography size="medium" variant="label">
                {percentage}
              </Typography>
            </Tag>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ItemCoin;
