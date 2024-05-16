import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const { coinsMap, isFetchingCoinBalances } = useWeb3();
  const { control } = useFormContext<SwapForm>();

  const type = useWatch({ control, name: `${label}.type` });
  const decimals = useWatch({ control, name: `${label}.decimals` });

  const balance = FixedPointMath.toNumber(
    BigNumber(coinsMap[type]?.balance || '0'),
    coinsMap[type]?.decimals ?? decimals
  );

  return (
    <Box px="l" display="flex" justifyContent="space-between" color="onSurface">
      <Typography variant="label" size="small">
        You {label == 'from' ? 'pay' : 'receive'}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap="2xs">
        <Typography variant="label" size="small">
          Balance:
        </Typography>
        {type && isFetchingCoinBalances ? (
          <ProgressIndicator size={16} variant="loading" />
        ) : (
          <Typography variant="label" size="small" color="primary">
            {balance}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default HeaderInfo;
