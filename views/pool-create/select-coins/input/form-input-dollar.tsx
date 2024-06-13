import { Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { formatDollars } from '@/utils';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const FormInputDollar: FC<InputProps> = ({ index }) => {
  console.log(index);
  const { control } = useFormContext<CreatePoolForm>();

  const value = useWatch({ control, name: `tokens.${index}.value` });
  const usdPrice = useWatch({ control, name: `tokens.${index}.usdPrice` });

  const usdValue =
    usdPrice && value
      ? formatDollars(
          +BigNumber(value).times(BigNumber(usdPrice)).toNumber().toFixed(3)
        )
      : '--';

  return (
    <Typography
      size="small"
      variant="label"
      textAlign="right"
      color="onSurface"
    >
      {usdValue} USD
    </Typography>
  );
};

export default FormInputDollar;
