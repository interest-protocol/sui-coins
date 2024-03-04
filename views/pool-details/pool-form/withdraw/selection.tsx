import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import RadioField from './radio-field';
import SelectionTokenList from './token-list';
import { SelectionFieldValues } from './withdraw.types';

const Selection: FC = () => {
  const [currentSelected, setCurrentSelected] = useState<SelectionFieldValues>(
    SelectionFieldValues.None
  );

  const handleSelection = (newSelection: SelectionFieldValues) =>
    setCurrentSelected(newSelection);

  return (
    <Box display="flex" flexDirection="column" gap="m" mt="s">
      <Typography variant="body" size="large">
        2. Choose type
      </Typography>
      <Box
        pt="m"
        display="flex"
        bg="container"
        borderRadius="xs"
        border="1px solid"
        flexDirection="column"
        borderColor="container"
      >
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
        {currentSelected != SelectionFieldValues.None && (
          <SelectionTokenList type={currentSelected} />
        )}
      </Box>
    </Box>
  );
};

export default Selection;
