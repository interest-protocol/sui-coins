import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TimesSVG } from '@/svg';

import { FilterItemProps, PoolForm } from '../../pools.types';

const FilterSelectedItem: FC = () => {
  const { control, resetField } = useFormContext<PoolForm>();
  const isFindingPool = useWatch({ control, name: 'isFindingPool' });
  const tokens = useWatch({ control, name: 'tokenList' });
  const fields = useWatch({ control, name: 'filterList' });
  const { replace } = useFieldArray({
    control,
    name: 'filterList',
  });

  const removeFilter = (filter: FilterItemProps) => {
    const tmpFilters = fields?.filter(
      (field) => filter.description != field.description
    );
    replace(tmpFilters);
  };

  const erase = () => {
    resetField('tokenList');
    resetField('filterList');
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
            py="xs"
            pl="xs"
            pr="m"
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
      {isFindingPool && tokens?.length && (
        <Box
          key={v4()}
          display="flex"
          alignItems="center"
          flexDirection={['column', 'column', 'column', 'row']}
          justifyContent={['center', 'center', 'center', 'flex-start']}
        >
          <Button
            pr="m"
            py="xs"
            pl="xs"
            variant="outline"
            borderRadius="full"
            onClick={() => resetField('tokenList')}
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
            {tokens.map(({ symbol }) => symbol).join('•')}
          </Button>
        </Box>
      )}
      {!!fields?.length && (
        <Button
          px="m"
          py="xs"
          onClick={erase}
          variant="tonal"
          borderRadius="full"
        >
          erase
        </Button>
      )}
    </Box>
  );
};
export default FilterSelectedItem;
