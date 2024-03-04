import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import RadioField from './radio-field';
import { SelectionFieldValues } from './withdraw.types';

const Selection: FC = () => {
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
        border="1px solid"
        borderColor="container"
        px="xl"
        py="m"
        bg="container"
        borderRadius="xs"
        display="flex"
        gap="xl"
      >
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
    </Box>
  );
};

export default Selection;
