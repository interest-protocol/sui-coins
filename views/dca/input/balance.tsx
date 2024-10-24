import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
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
  const symbol = useWatch({ control, name: `${label}.symbol` });
  const decimals = useWatch({ control, name: `${label}.decimals` });

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

  const adjustBalance = (deduction: number, divisor: number = 1) => {
    const adjustedBalance = balance / divisor - (isSui(type) ? deduction : 0);

    if (adjustedBalance < 1 && isSui(type)) {
      setValue('from.value', ZERO_BIG_NUMBER);
      setValue('from.display', '0');
    } else {
      setValue(
        'from.value',
        coinsMap[type]?.balance
          .dividedBy(divisor)
          .minus(isSui(type) ? deduction * 1_000_000_000 : 0)
      );
      setValue('from.display', String(adjustedBalance));
    }
  };

  const handleMax = () => label !== 'to' && adjustBalance(1);

  const handleHalf = () => label !== 'to' && adjustBalance(0.5, 2);

  return (
    <Box gap="xs" display="flex" alignItems="center" justifyContent="center">
      <Box
        p="2xs"
        gap="0.5rem"
        display="flex"
        color="outline"
        alignItems="center"
        borderColor="transparent"
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
      </Box>
      {label === 'from' && (
        <Box display="flex" gap="xs">
          <Tag
            size="small"
            variant="outline"
            nFocus={{
              color: '#0053DB',
              borderColor: '#0053DB',
              background: '#0053DB14',
            }}
            fontFamily="Satoshi"
            onClick={handleHalf}
            nHover={{ bg: 'unset', borderColor: 'primary', color: 'primary' }}
          >
            HALF
          </Tag>
          <Tag
            size="small"
            variant="outline"
            nFocus={{
              color: '#0053DB',
              borderColor: '#0053DB',
              background: '#0053DB14',
            }}
            onClick={handleMax}
            fontFamily="Satoshi"
            nHover={{ bg: 'unset', borderColor: 'primary', color: 'primary' }}
          >
            MAX
          </Tag>
        </Box>
      )}
    </Box>
  );
};

export default Balance;
