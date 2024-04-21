import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';

import { PoolDetailAccordionItemCoinProps } from './accordion.types';

const ItemCoin: FC<PoolDetailAccordionItemCoinProps> = ({
  type,
  symbol,
  percentage,
  conversion,
  value,
}) => {
  const network = useNetwork();

  return (
    <Box
      py="l"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <TokenIcon
          withBg
          rounded
          type={type}
          symbol={symbol}
          network={network}
        />
        <Typography size="medium" variant="body" mr="0.5rem">
          {symbol}
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
