import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { PlusSVG } from '@/svg';

import { PoolForm } from '../../pools.types';
import SelectToken from './select-token';

const SelectCoins: FC = () => {
  const { control } = useFormContext<PoolForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tokenList',
    rules: { maxLength: 2 },
  });

  const onRemoveSelectToken = (index: number) => remove(index);

  return (
    <Box my="2xs" height="73%">
      <Box px="l" mx="auto" gap="2rem">
        <Typography variant="body" size="medium" color="onSurface">
          Select pool token
        </Typography>
        <Box display="grid" gap="s" my="s">
          {fields.slice(0, 2).map(({ id }, index) => (
            <SelectToken
              key={id}
              index={index}
              canRemove={fields.length > 2}
              handleRemoveSelectToken={onRemoveSelectToken}
            />
          ))}
        </Box>
        {fields.length < 2 && (
          <Button
            mt="xl"
            mx="auto"
            variant="outline"
            color="onSurface"
            borderRadius="xs"
            borderColor="outlineVariant"
            onClick={() =>
              append({
                symbol: '',
                value: '0',
                decimals: 0,
                locked: false,
                type: '' as `0x${string}`,
              })
            }
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
