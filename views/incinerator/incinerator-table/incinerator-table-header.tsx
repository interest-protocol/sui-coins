import { Box, Checkbox, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { FilterArrowDownSVG } from '@/svg';

import { TableHeaderData } from '../incinerator.data';
import { IncineratorForm } from '../incinerator.types';

const IncineratorTableHeader: FC = () => {
  const { control, setValue } = useFormContext<IncineratorForm>();
  const checked = useWatch({ control: control, name: 'checked' });

  const toggleChecked = () => setValue('checked', !checked);

  return (
    <Box as="thead">
      <Box as="tr">
        <Typography as="th" size="small" variant="label">
          <Checkbox label="" defaultValue={checked} onClick={toggleChecked} />
        </Typography>
        {TableHeaderData.map((item) => (
          <Typography
            as="th"
            pr="xl"
            key={v4()}
            size="small"
            color="outline"
            cursor="pointer"
            textAlign="left"
            variant="headline"
          >
            <Box display="flex" alignItems="center" gap="xs">
              <Typography
                variant="headline"
                size="small"
                fontSize="xs"
                width="max-content"
              >
                {item}
              </Typography>
              <Box width="0.5rem" height="0.5rem" display="flex" color="black">
                <FilterArrowDownSVG
                  maxHeight="100%"
                  maxWidth="100%"
                  width="100%"
                />
              </Box>
            </Box>
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default IncineratorTableHeader;
