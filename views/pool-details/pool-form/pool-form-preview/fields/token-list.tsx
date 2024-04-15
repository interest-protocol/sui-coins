import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { TOKEN_ICONS } from '@/lib';

import { FieldProps } from '../preview.types';

const TokenListFields: FC<FieldProps> = ({ getValues }) => {
  const network = useNetwork();
  const tokenList = getValues('tokenList');

  return (
    <Box>
      {tokenList.map((token) => {
        const Icon = TOKEN_ICONS[network][token.symbol];

        return (
          <Box key={v4()} py="xs" display="flex" justifyContent="space-between">
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
                <Icon maxHeight="1rem" maxWidth="1rem" width="100%" />
              </Box>
              <Typography variant="body" size="large">
                {token.symbol}
              </Typography>
            </Box>
            <Typography variant="body" ml="m" size="large">
              {token.value}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default TokenListFields;
