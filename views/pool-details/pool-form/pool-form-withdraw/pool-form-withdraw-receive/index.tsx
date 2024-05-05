import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { SelectionFieldValues } from '../../pool-form.types';
import PoolFormWithdrawReceiveTokens from './pool-form-withdraw-receive-tokens';
import PoolFormWithdrawReceiveType from './pool-form-withdraw-receive-type';

const PoolFormWithdrawReceive: FC = () => {
  const [currentSelected, setCurrentSelected] = useState<SelectionFieldValues>(
    SelectionFieldValues.None
  );

  const handleSelection = (newSelection: SelectionFieldValues) =>
    setCurrentSelected(newSelection);

  return (
    <Box display="flex" flexDirection="column" gap="m">
      <Typography variant="body" size="large">
        2. Choose type
      </Typography>
      <Box
        display="flex"
        borderRadius="xs"
        overflow="hidden"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Box display="flex" gap="xl" pb="m" px="xl">
          <PoolFormWithdrawReceiveType
            label="One Coin"
            handleSelect={handleSelection}
            currentValue={currentSelected}
            type={SelectionFieldValues.OneCoin}
          />
          <PoolFormWithdrawReceiveType
            label="Balance"
            handleSelect={handleSelection}
            currentValue={currentSelected}
            type={SelectionFieldValues.Balance}
          />
        </Box>
        <PoolFormWithdrawReceiveTokens type={currentSelected} />
      </Box>
    </Box>
  );
};

export default PoolFormWithdrawReceive;
