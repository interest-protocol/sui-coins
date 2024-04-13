import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { usePoolDetails } from '../../pool-details.context';
import RadioField from './radio-field';
import SelectionTokenList from './token-list';
import { SelectionFieldValues } from './withdraw.types';

const Selection: FC = () => {
  const { pool } = usePoolDetails();

  const [currentSelected, setCurrentSelected] = useState<SelectionFieldValues>(
    SelectionFieldValues.None
  );

  const handleSelection = (newSelection: SelectionFieldValues) =>
    setCurrentSelected(newSelection);

  return (
    <Box display="flex" flexDirection="column" gap="m">
      {pool?.poolType !== 'amm' && (
        <Typography variant="body" size="large">
          2. Choose type
        </Typography>
      )}
      <Box
        display="flex"
        borderRadius="xs"
        overflow="hidden"
        bg="lowestContainer"
        flexDirection="column"
      >
        {pool?.poolType !== 'amm' && (
          <Box display="flex" gap="xl" pb="m" px="xl">
            <RadioField
              label="One Coin"
              currentValue={currentSelected}
              type={SelectionFieldValues.OneCoin}
              handleSelect={handleSelection}
            />
            <RadioField
              label="Balance"
              currentValue={currentSelected}
              type={SelectionFieldValues.Balance}
              handleSelect={handleSelection}
            />
          </Box>
        )}
        {pool?.poolType !== 'amm' &&
        currentSelected != SelectionFieldValues.None ? (
          <SelectionTokenList type={currentSelected} />
        ) : (
          <SelectionTokenList type={SelectionFieldValues.Balance} />
        )}
      </Box>
    </Box>
  );
};

export default Selection;
