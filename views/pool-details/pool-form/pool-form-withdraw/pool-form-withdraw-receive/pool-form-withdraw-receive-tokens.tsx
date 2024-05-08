import {
  Box,
  ProgressIndicator,
  RadioButton,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { PoolForm } from '@/views/pools/pools.types';

import { SelectionFieldValues, TokenListProps } from '../../pool-form.types';

const PoolFormWithdrawReceiveTokens: FC<TokenListProps> = ({ type }) => {
  const network = useNetwork();
  const { control, setValue } = useFormContext<PoolForm>();

  const tokenList = useWatch({ control, name: 'tokenList' });
  const tokenSelected = useWatch({ control, name: 'tokenSelected' });
  const loading = useWatch({ control, name: 'isFindingPool' });

  const isOneCoin = type === SelectionFieldValues.OneCoin;

  return (
    <Box py="xs" borderTop="1px solid" borderColor="container">
      {tokenList.map(({ type, symbol, value }) => (
        <Box
          py="m"
          px="xl"
          key={v4()}
          display="flex"
          cursor="pointer"
          alignItems="center"
          justifyContent="space-between"
          transition="all 350ms ease-in-out"
          nHover={isOneCoin && { bg: 'lowContainer' }}
          onClick={() => isOneCoin && setValue('tokenSelected', type)}
        >
          <Box display="flex" gap="xs" alignItems="center">
            {isOneCoin && <RadioButton defaultValue={tokenSelected === type} />}
            <TokenIcon withBg symbol={symbol} type={type} network={network} />
            <Typography variant="body" size="large">
              {symbol}
            </Typography>
          </Box>
          {loading ? (
            <ProgressIndicator size={16} variant="loading" />
          ) : (
            <Typography variant="body" ml="m" size="large">
              {isOneCoin ? (tokenSelected ? value ?? 0 : 0) : value ?? 0}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PoolFormWithdrawReceiveTokens;
