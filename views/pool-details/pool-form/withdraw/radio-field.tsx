import { Box, RadioButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { RadioFieldProps, SelectionFieldValues } from './withdraw.types';

const RadioField: FC<RadioFieldProps> = ({
  label,
  currentValue,
  type,
  handleSelect,
}) => {
  const isSelected = type === currentValue;
  const onClick = () =>
    handleSelect(isSelected ? SelectionFieldValues.None : type);

  return (
    <Box display="flex" alignItems="center" gap="s">
      <RadioButton defaultValue={isSelected} onClick={onClick} />
      <Typography variant="body" size="large">
        {label}
      </Typography>
    </Box>
  );
};

export default RadioField;
