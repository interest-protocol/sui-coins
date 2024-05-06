import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';

import { DCAForm } from '../dca.types';

const SelectTokenInfo: FC = () => {
  const { coinsMap } = useWeb3();
  const { control } = useFormContext<DCAForm>();

  const type = useWatch({ control, name: 'to.type' });
  const symbol = useWatch({ control, name: 'to.symbol' });
  const decimals = useWatch({ control, name: 'to.decimals' });

  const balance = FixedPointMath.toNumber(
    BigNumber(coinsMap[type]?.balance || '0'),
    coinsMap[type]?.decimals ?? decimals
  );

  return (
    <Box px="l" display="flex" justifyContent="space-between">
      <Typography variant="label" size="small">
        To
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

export default SelectTokenInfo;
