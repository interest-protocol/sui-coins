import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { SelectTokenFilterProps } from './select-token-modal.types';

const SelectTokenFilter: FC<SelectTokenFilterProps> = ({
  control,
  setValue,
}) => {
  const filterSelected = useWatch({ control, name: 'filter' });

  return (
    <Box
      mt="s"
      gap="s"
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns="1fr 1fr"
    >
      {['Strict', 'Wallet'].map((item, index) => (
        <Box
          key={v4()}
          cursor="pointer"
          onClick={() => setValue('filter', index)}
        >
          <Typography variant="body" size="medium" textAlign="center" py="m">
            {item}
          </Typography>
          {filterSelected === index && (
            <Motion layout borderBottom="2px solid" borderColor="primary" />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SelectTokenFilter;
