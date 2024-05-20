import { Box, RadioButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { PoolForm } from '@/views/pools/pools.types';

import { RadioFieldProps, SelectionFieldValues } from '../../pool-form.types';

const PoolFormWithdrawReceiveType: FC<RadioFieldProps> = ({
  type,
  label,
  isSelected,
  handleSelect,
}) => {
  const { setValue } = useFormContext<PoolForm>();

  const onClick = () => {
    if (type === SelectionFieldValues.Balance)
      setValue('tokenSelected', undefined);

    handleSelect(isSelected ? SelectionFieldValues.None : type);
  };

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
