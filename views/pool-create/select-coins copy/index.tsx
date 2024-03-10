import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { PlusSVG } from '@/svg';

import { CreatePoolForm } from '../pool-create.types';
import PoolCreateButton from '../pool-create-button';
import Input from './input';

const SelectCoins: FC = () => {
  const { control } = useFormContext<CreatePoolForm>();
  const isStable = useWatch({ control, name: 'isStable' });
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'tokens',
    rules: { maxLength: isStable ? 5 : 3 },
  });

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
          <Box display="grid" gap="s" my="s">
            {fields.slice(0, isStable ? 5 : 3).map(({ id }, index) => (
              <Input key={id} index={index} />
            ))}
          </Box>
          {fields.length < (isStable ? 5 : 3) && (
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
