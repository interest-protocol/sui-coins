import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
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
      gap="s"
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns="1fr 1fr 1fr"
    >
      {['All', 'Favorite', 'Suggested'].map((item, index) => (
        <Tag
          key={v4()}
          display="flex"
          variant="outline"
          justifyContent="center"
          onClick={() => setValue('filter', index)}
          bg={filterSelected === index ? 'primary' : ''}
          border={filterSelected === index ? 'none' : ''}
          color={filterSelected === index ? 'onPrimary' : ''}
          nFocus={{
            bg: filterSelected === index ? 'primary' : '',
            border: filterSelected === index ? 'none' : '',
            color: filterSelected === index ? 'onPrimary' : 'surface',
          }}
          nHover={{
            bg: filterSelected === index ? 'primary' : '',
            border: filterSelected === index ? 'none' : '',
            color: filterSelected === index ? 'onPrimary' : '',
          }}
        >
          <Typography variant="label" size="large">
            {item}
          </Typography>
        </Tag>
      ))}
    </Box>
  );
};

export default SelectTokenFilter;
