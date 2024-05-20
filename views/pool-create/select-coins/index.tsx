import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { MinusSVG, PlusSVG } from '@/svg';

import { CreatePoolForm } from '../pool-create.types';
import PoolCreateButton from '../pool-create-button';
import Input from './input';

const STABLE_LIMIT = 2;
const VOLATILE_LIMIT = 2;

const SelectCoins: FC = () => {
  const { control } = useFormContext<CreatePoolForm>();
  const isStable = useWatch({ control, name: 'isStable' });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tokens',
    rules: { maxLength: isStable ? STABLE_LIMIT : VOLATILE_LIMIT },
  });

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Box my="xl">
        <Box
          p="2xl"
          mx="auto"
          gap="2rem"
          maxWidth="33rem"
          borderRadius="xs"
          bg="lowestContainer"
        >
          <Typography variant="body" size="small" color="onSurface">
            Select Token & Deposit
          </Typography>
          <Box>
            {fields
              .slice(0, isStable ? STABLE_LIMIT : VOLATILE_LIMIT)
              .map(({ id }, index) => (
                <Box key={id} my="s" display="flex" gap="s" alignItems="center">
                  <Input index={index} />
                  {fields.length > 2 && (
                    <Box
                      display="flex"
                      minWidth="2rem"
                      minHeight="2rem"
                      bg="lowContainer"
                      cursor="pointer"
                      color="onSurface"
                      alignItems="center"
                      borderRadius="full"
                      justifyContent="center"
                      nHover={{ bg: 'lowestContainer' }}
                      onClick={() => handleRemoveField(index)}
                    >
                      <MinusSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
                    </Box>
                  )}
                </Box>
              ))}
          </Box>
          {fields.length < (isStable ? STABLE_LIMIT : VOLATILE_LIMIT) && (
            <Button
              mt="xl"
              mx="auto"
              variant="outline"
              color="onSurface"
              onClick={() =>
                append({
                  type: '' as `0x${string}`,
                  symbol: '',
                  decimals: 0,
                  value: '',
                })
              }
              borderColor="outlineVariant"
              PrefixIcon={
                <PlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
              }
            >
              Add Coin
            </Button>
          )}
        </Box>
      </Box>
      <PoolCreateButton />
    </>
  );
};

export default SelectCoins;
