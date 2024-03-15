import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { PlusSVG } from '@/svg';

import { FindPoolForm } from '../find-pool-modal.types';
import SelectToken from './select-token';

const SelectCoins: FC = () => {
  const { control } = useFormContext<FindPoolForm>();
  const { fields, append } = useFieldArray({
    control,
    name: 'tokens',
    rules: { maxLength: 5 },
  });

  return (
    <Box my="2xs" height="73%">
      <Box px="l" mx="auto" gap="2rem">
        <Typography variant="body" size="medium" color="onSurface">
          Select pool token
        </Typography>
        <Box display="grid" gap="s" my="s">
          {fields.slice(0, 5).map(({ id }, index) => (
            <SelectToken key={id} index={index} />
          ))}
        </Box>
        {fields.length < 5 && (
          <Button
            mt="xl"
            mx="auto"
            variant="outline"
            color="onSurface"
            borderRadius="xs"
            borderColor="outlineVariant"
            onClick={() => append({ type: '', symbol: '', decimals: 0 })}
            PrefixIcon={
              <PlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            }
          >
            Add Coin
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SelectCoins;
