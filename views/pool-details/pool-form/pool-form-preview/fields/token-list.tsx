import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';

import { FieldProps } from '../preview.types';

const TokenListFields: FC<FieldProps> = ({ getValues }) => {
  const network = useNetwork();
  const tokenList = getValues('tokenList');

  return (
    <Box>
      {tokenList.map((token) => (
        <Box key={v4()} py="xs" display="flex" justifyContent="space-between">
          <Box display="flex" gap="xs" alignItems="center">
            <TokenIcon
              withBg
              type={token.type}
              network={network}
              symbol={token.symbol}
            />
            <Typography variant="body" size="large">
              {token.symbol}
            </Typography>
          </Box>
          <Typography variant="body" ml="m" size="large">
            {token.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TokenListFields;
