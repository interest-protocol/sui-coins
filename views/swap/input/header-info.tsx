import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const { coinsMap } = useWeb3();
  const { control } = useFormContext<SwapForm>();

  const type = useWatch({ control, name: `${label}.type` });
  const symbol = useWatch({ control, name: `${label}.symbol` });
  const decimals = useWatch({ control, name: `${label}.decimals` });

  const balance = FixedPointMath.toNumber(
    coinsMap[type]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[type]?.decimals ?? decimals
  );

  return (
    <Box px="l" display="flex" justifyContent="space-between">
      <Typography variant="label" size="small">
        {label}
        <Typography
          as="span"
          size="small"
          variant="label"
          display={['inline-block', 'none']}
        >
          : {symbol}
        </Typography>
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap="2xs">
        <Typography variant="label" size="small">
          Balance:
        </Typography>
        <Typography variant="label" size="small" color="primary">
          {balance}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderInfo;
