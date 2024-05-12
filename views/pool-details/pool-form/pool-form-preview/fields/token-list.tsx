import { Box, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';

import { FieldProps } from '../preview.types';

const TokenListFields: FC<FieldProps> = ({ getValues }) => {
  const { network } = useSuiClientContext();
  const tokenList = getValues('tokenList');

  return (
    <Box>
      {tokenList.map((token) => (
        <Box key={v4()} py="xs" display="flex" justifyContent="space-between">
          <Box display="flex" gap="xs" alignItems="center">
            <TokenIcon
              withBg
              type={token.type}
              symbol={token.symbol}
              network={network as Network}
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
