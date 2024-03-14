import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';

import { FindPoolForm } from '../../find-pool-modal.types';
import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ index }) => {
  const { coinsMap } = useWeb3();
  const { control } = useForm<FindPoolForm>();

  const type = useWatch({ control, name: `tokens.${index}.type` });
  const decimals = useWatch({ control, name: `tokens.${index}.decimals` });

  const balance = FixedPointMath.toNumber(
    BigNumber(coinsMap[type]?.balance || '0'),
    coinsMap[type]?.decimals ?? decimals
  );

  return (
    <Box
      gap="2xs"
      top="0.2rem"
      display="flex"
      right="1.2rem"
      color="onSurface"
      position="absolute"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="label" size="small">
        Balance:
      </Typography>
      <Typography variant="label" size="small" color="primary">
        {balance}
      </Typography>
    </Box>
  );
};

export default HeaderInfo;
