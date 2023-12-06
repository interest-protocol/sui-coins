import {
  Box,
  Tag,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { SelectTokenFilterProps } from './select-token-modal.types';

const SelectTokenFilter: FC<SelectTokenFilterProps> = ({
  formSearchToken: { control, setValue },
}) => {
  const { colors } = useTheme() as Theme;
  const filterSeleted = useWatch({ control, name: 'filter' });

  return (
    <Box
      px="m"
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
          color={filterSeleted == index ? 'primary' : ''}
          borderColor={filterSeleted == index ? 'primary' : ''}
          bg={filterSeleted == index ? `${colors.primary}14` : ''}
          nFocus={{
            color: 'surface',
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
