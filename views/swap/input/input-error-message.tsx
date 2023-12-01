import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { InputProps } from './input.types';

const InputErrorMessage: FC<InputProps> = ({ label }) => {
  const { control } = useFormContext();

  const { type, balance, value } = useWatch({
    control,
    name: label,
  });

  const oppositeType = useWatch({
    control,
    name: `${label === 'to' ? 'from' : 'to'}.type`,
  });

  const getError = () => {
    if (label === 'to' && oppositeType === type)
      return 'You cannot swap same token';

    if (Number(value) > balance) return 'You have not enough';

    return '';
  };

  if (!getError()) return null;

  return (
    <Typography variant="body" size="small" color="error" mr="m">
      {getError()}
    </Typography>
  );
};

export default InputErrorMessage;
