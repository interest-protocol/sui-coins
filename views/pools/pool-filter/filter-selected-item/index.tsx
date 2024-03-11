import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TimesSVG } from '@/svg';

import { FilterItemProps, PoolForm } from '../../pools.types';

const FilterSelectedItem: FC = () => {
  const { control } = useFormContext<PoolForm>();
  const fields = useWatch({ control, name: 'filterList' });
  const { replace } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'filterList',
  });

  const removeFilter = (filter: FilterItemProps) => {
    const tmpFilters = fields?.filter(
      (field) => filter.description != field.description
    );
    replace(tmpFilters);
  };

  const erase = () => {
    replace([]);
  };

  return (
    <Box display="flex" gap="s" alignItems="center" flexWrap="wrap">
      {fields?.map((field) => (
        <Box
          key={v4()}
          display="flex"
          alignItems="center"
          flexDirection={['column', 'column', 'column', 'row']}
          justifyContent={['center', 'center', 'center', 'flex-start']}
        >
          <Button
            variant="outline"
            borderRadius="full"
            py="0.5rem"
            pl="0.5rem"
            pr="1rem"
            onClick={() => removeFilter(field)}
            PrefixIcon={
              <Box
                width="1.125rem"
                height="1.125rem"
                color="lowestContainer"
                bg="onSurface"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <TimesSVG maxWidth="0.5rem" maxHeight="0.5rem" width="100%" />
              </Box>
            }
          >
            {field.description}
          </Button>
        </Box>
      ))}
      {fields?.length != 0 && (
        <Button
          variant="tonal"
          borderRadius="full"
          px="m"
          py="xs"
          onClick={erase}
        >
          erase
        </Button>
      )}
    </Box>
  );
};
export default FilterSelectedItem;
