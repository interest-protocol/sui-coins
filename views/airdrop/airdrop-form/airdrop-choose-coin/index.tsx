import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import AirdropChooseCoinBalance from './airdrop-choose-coin-balance';
import AirdropSelectToken from './airdrop-select-token';

const AirdropChooseCoin: FC = () => {
  const { control } = useFormContext();
  const method = useWatch({ control, name: 'method' });

  if (!method) return null;

  return (
    <Box
      p="xl"
      gap="s"
      display="flex"
      borderRadius="xs"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Typography variant="body" size="large">
          2. Choose a {method === 'suiPlay' && 'whitelisted'} coin
        </Typography>
        <AirdropChooseCoinBalance />
      </Box>
      <AirdropSelectToken isStrict={method === 'suiPlay'} />
    </Box>
  );
};

export default AirdropChooseCoin;
