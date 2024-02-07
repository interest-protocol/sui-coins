import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const AmountInDollar: FC<InputProps> = ({ label }) => {
  const { control } = useFormContext<SwapForm>();

  const dollarValue = useWatch({
    control,
    name: `${label}.value`,
  });

  return (
    <Typography
      mr="l"
      size="small"
      variant="body"
      color={dollarValue ? 'onSurface' : 'outline'}
    >
      $ {dollarValue ?? 0} USD
    </Typography>
  );
};

export default AmountInDollar;
