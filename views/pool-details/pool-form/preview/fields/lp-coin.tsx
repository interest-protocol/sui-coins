import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import IPX from '@/components/svg/ipx';

import { PoolPreviewProps } from '../preview.types';

const LpCoinField: FC<PoolPreviewProps> = ({ getValues }) => {
  const lpCoin = getValues(`lpCoin`);

  return (
    <Box>
      <Box py="xs" display="flex" justifyContent="space-between">
        <Box display="flex" gap="xs" alignItems="center">
          <Box
            display="flex"
            bg="onSurface"
            width="1.5rem"
            height="1.5rem"
            borderRadius="full"
            alignItems="center"
            justifyContent="center"
            color="lowestContainer"
          >
            <IPX maxHeight="1rem" maxWidth="1rem" width="100%" />
          </Box>
          <Typography variant="body" size="large">
            LPs Coin
          </Typography>
        </Box>
        <Typography variant="body" ml="m" size="large">
          {lpCoin}
        </Typography>
      </Box>
    </Box>
  );
};

export default LpCoinField;
