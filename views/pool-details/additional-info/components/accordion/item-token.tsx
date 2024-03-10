import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PoolDetailAccordionItemCoinProps } from './accordion.type';

const ItemCoin: FC<PoolDetailAccordionItemCoinProps> = ({
  coinName,
  percentage,
  conversion,
  value,
  Icon,
}) => {
  return (
    <Box
      py="l"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        {Icon && (
          <Box mr="0.5rem" display="flex" alignItems="center">
            <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
          </Box>
        )}
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
            <Tag variant="filled" bg="lowContainer" color="onSurface">
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
