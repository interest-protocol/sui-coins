import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { FilterData } from './incinerator.data';
import { IncineratorForm } from './incinerator.types';

const IncineratorFilterTabs: FC = () => {
  const { control, setValue } = useFormContext<IncineratorForm>();
  const filterSelected = useWatch({ control: control, name: 'filter' });

  return (
    <Box
      gap="s"
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns="1fr 1fr 1fr 1fr"
    >
      {FilterData.map((item, index) => (
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

export default IncineratorFilterTabs;
