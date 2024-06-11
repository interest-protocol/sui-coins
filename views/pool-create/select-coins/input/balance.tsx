import { Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const Balance: FC<InputProps> = ({ index }) => {
  const { coinsMap } = useWeb3();
  const { control } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: `tokens.${index}.type` });
  const decimals = useWatch({ control, name: `tokens.${index}.decimals` });

  const balance = FixedPointMath.toNumber(
    BigNumber(coinsMap[type]?.balance || '0'),
    coinsMap[type]?.decimals ?? decimals
  );

  return (
    <Typography
      pt="2xs"
      size="large"
      variant="label"
      fontSize="0.75rem"
      color="onSurface"
    >
      Balance: {balance}
    </Typography>
  );
};

export default Balance;
