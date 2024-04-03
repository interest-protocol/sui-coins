import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { MinusSVG, PlusSVG } from '@/svg';

import { CreatePoolForm } from '../pool-create.types';
import PoolCreateButton from '../pool-create-button';
import Input from './input';

const SelectCoins: FC = () => {
  const { control } = useFormContext<CreatePoolForm>();
  const isStable = useWatch({ control, name: 'isStable' });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tokens',
    rules: { maxLength: isStable ? 5 : 3 },
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
          bg="container"
          maxWidth="33rem"
          borderRadius="xs"
        >
          <Typography variant="body" size="small" color="onSurface">
            Select Token & Deposit
          </Typography>
          <Box display="grid">
            {fields.slice(0, isStable ? 5 : 3).map(({ id }, index) => (
              <Box key={id} display="flex" my="2xs" alignItems="center" gap="s">
                <Input index={index} />
                {fields.length > 2 && (
                  <Box
                    color="onSurface"
                    bg="container"
                    nHover={{
                      bg: 'surface',
                    }}
                    display="flex"
                    minWidth="2rem"
                    minHeight="2rem"
                    cursor="pointer"
                    alignItems="center"
                    borderRadius="full"
                    justifyContent="center"
                    onClick={() => handleRemoveField(index)}
                  >
                    <MinusSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          {fields.length < 3 && (
            <Button
              mt="xl"
              mx="auto"
              variant="outline"
              color="onSurface"
              onClick={() =>
                append({ type: '', symbol: '', decimals: 0, value: '' })
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
