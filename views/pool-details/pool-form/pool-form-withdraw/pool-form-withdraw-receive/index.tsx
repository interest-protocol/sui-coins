import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { SelectionFieldValues } from '../../pool-form.types';
import PoolFormWithdrawReceiveTokens from './pool-form-withdraw-receive-tokens';
import PoolFormWithdrawReceiveType from './pool-form-withdraw-receive-type';

const PoolFormWithdrawReceive: FC = () => {
  const [currentSelected, setCurrentSelected] = useState<SelectionFieldValues>(
    SelectionFieldValues.None
  );

  return (
    <Box display="flex" flexDirection="column" gap="m">
      <Typography variant="body" size="large">
        2. Choose type
      </Typography>
      <Box
        display="flex"
        overflow="hidden"
        borderRadius="xs"
        border="1px solid"
        flexDirection="column"
        borderColor="container"
      >
        <Box p="l" gap="xl" display="flex">
          <PoolFormWithdrawReceiveType
            label="One Coin"
            handleSelect={setCurrentSelected}
            type={SelectionFieldValues.OneCoin}
            isSelected={currentSelected == SelectionFieldValues.OneCoin}
          />
          <PoolFormWithdrawReceiveType
            label="Balance"
            handleSelect={setCurrentSelected}
            type={SelectionFieldValues.Balance}
            isSelected={currentSelected == SelectionFieldValues.Balance}
          />
        </Box>
        {!!currentSelected && (
          <PoolFormWithdrawReceiveTokens type={currentSelected} />
        )}
      </Box>
    </Box>
  );
};

export default PoolFormWithdrawReceive;
