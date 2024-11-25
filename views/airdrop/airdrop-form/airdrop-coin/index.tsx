import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AirdropCoinProps, IAirdropForm } from '../../airdrop.types';
import AirdropChooseCoinBalance from './airdrop-choose-coin-balance';
import AirdropInput from './airdrop-input';
import AirdropSelectToken from './airdrop-select-token';

const AirdropCoin: FC<AirdropCoinProps> = ({ setIsProgressView }) => {
  const { control } = useFormContext<IAirdropForm>();
  const method = useWatch({ control, name: 'method' });
  const step = useWatch({ control, name: 'step' });

  if (step !== 2) return null;

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
          3. Choose a {method === 'suiPlay' && 'whitelisted'} coin
        </Typography>
        <AirdropChooseCoinBalance />
      </Box>
      <AirdropSelectToken isStrict={method === 'suiPlay'} />
      <AirdropInput setIsProgressView={setIsProgressView} />
    </Box>
  );
};

export default AirdropCoin;
