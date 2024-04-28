import { Box, RadioButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { RadioFieldProps, SelectionFieldValues } from '../../pool-form.types';

const PoolFormWithdrawReceiveType: FC<RadioFieldProps> = ({
  label,
  currentValue,
  type,
  handleSelect,
}) => {
  const isSelected = type === currentValue;
  const onClick = () =>
    handleSelect(isSelected ? SelectionFieldValues.None : type);

  return (
    <Box
      gap="l"
      display="flex"
      cursor="pointer"
      onClick={onClick}
      alignItems="center"
    >
      <RadioButton defaultValue={isSelected} />
      <Typography variant="body" size="large">
        {label}
      </Typography>
    </Box>
  );
};

export default PoolFormWithdrawReceiveType;
