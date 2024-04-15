import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import IPX from '@/components/svg/ipx';

import { FieldProps } from '../preview.types';

const LpCoinField: FC<FieldProps> = ({ getValues }) => (
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
          {getValues('lpCoin.symbol')}
        </Typography>
      </Box>
      <Typography variant="body" ml="m" size="large">
        {getValues('lpCoin.value')}
      </Typography>
    </Box>
  </Box>
);

export default LpCoinField;
