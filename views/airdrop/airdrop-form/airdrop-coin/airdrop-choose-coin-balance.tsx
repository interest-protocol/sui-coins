import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

const AirdropChooseCoinBalance: FC = () => {
  const { coinsMap } = useWeb3();
  const { control } = useFormContext();
  const token = useWatch({ control, name: 'token' });

  if (!token) return null;

  return (
    <Typography variant="label" size="medium">
      Balance:{' '}
      {FixedPointMath.toNumber(
        coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER,
        token.decimals
      )}
    </Typography>
  );
};
export default AirdropChooseCoinBalance;
