import { Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { formatDollars } from '@/utils';

import { DCAForm } from '../dca.types';

const AmountInDollar: FC = () => {
  const { control } = useFormContext<DCAForm>();

  const value = useWatch({
    control,
    name: 'from.value',
  });

  const usdPrice = useWatch({
    control,
    name: 'from.usdPrice',
  });

  return (
    <Typography
      mr="l"
      size="small"
      variant="body"
      color={value ? 'onSurface' : 'outline'}
    >
      {usdPrice && value
        ? formatDollars(BigNumber(value).times(BigNumber(usdPrice)).toNumber())
        : '--'}{' '}
      USD
    </Typography>
  );
};

export default AmountInDollar;
