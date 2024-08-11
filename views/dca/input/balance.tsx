import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import SubtractBox from '@/components/svg/subtract-box';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { isSui, ZERO_BIG_NUMBER } from '@/utils';

import { DCAForm } from '../dca.types';
import { InputProps } from './input.types';

const Balance: FC<InputProps> = ({ label }) => {
  const { coinsMap } = useWeb3();
  const { control, setValue } = useFormContext<DCAForm>();

  const type = useWatch({ control, name: `${label}.type` });
  const decimals = useWatch({ control, name: `${label}.decimals` });
  const symbol = useWatch({ control, name: `${label}.symbol` });

  if (!type)
    return (
      <Box
        p="2xs"
        gap="0.5rem"
        display="flex"
        color="outline"
        alignItems="center"
      >
        <Box width="1rem" height="1rem">
          <SubtractBox
            maxHeight="100%"
            maxWidth="100%"
            width="100%"
            height="100%"
          />
        </Box>
        <Typography size="small" variant="body" fontSize="s">
          0
        </Typography>
      </Box>
    );

  const balance = FixedPointMath.toNumber(
    coinsMap[type]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[type]?.decimals ?? decimals
  );

  const handleMax = () => {
    if (label === 'to') return;

    if (isSui(type) && balance < 1) {
      setValue('from.value', ZERO_BIG_NUMBER);
      setValue('from.display', '0');
      return;
    }

    setValue(
      'from.value',
      coinsMap[type]?.balance.minus(isSui(type) ? 1_000_000_000 : 0)
    );
    setValue('from.display', String(balance - (isSui(type) ? 1 : 0)));
  };

  return (
    <Button
      p="2xs"
      gap="0.5rem"
      color="outline"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
    >
      <Box width="1rem" height="1rem">
        <SubtractBox
          maxHeight="100%"
          maxWidth="100%"
          width="100%"
          height="100%"
        />
      </Box>
      <Typography size="small" variant="body" fontSize="s">
        {symbol ? `${balance} ${symbol}` : '0'}
      </Typography>
    </Button>
  );
};

export default Balance;
