import { Box, Button, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { CreatePoolForm } from '../../pool-create.types';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ index }) => {
  const { coinsMap } = useWeb3();
  const { register, control, setValue } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: `tokens.${index}.type` });

  return (
    <Box
      width="100%"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      position="relative"
      alignItems="center"
      borderColor="outlineVariant"
      justifyContent="space-between"
    >
      <HeaderInfo index={index} />
      <SelectToken index={index} />
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <TextField
          pt="m"
          pl="-1rem"
          fontSize="2xl"
          lineHeight="l"
          placeholder="0"
          color="onSurface"
          textAlign="right"
          fontFamily="Satoshi"
          {...register(`tokens.${index}.value`, {
            onChange: (v: ChangeEvent<HTMLInputElement>) => {
              setValue?.(
                `tokens.${index}.value`,
                parseInputEventToNumberString(v)
              );
            },
          })}
          fieldProps={{
            width: '100%',
            borderRadius: 'xs',
            borderColor: 'transparent',
          }}
        />
      </Box>
      <Button
        px="s"
        variant="text"
        color="primary"
        onClick={() =>
          setValue(
            `tokens.${index}.value`,
            String(
              FixedPointMath.toNumber(
                coinsMap[type].balance,
                coinsMap[type].decimals
              )
            )
          )
        }
      >
        max
      </Button>
    </Box>
  );
};

export default Input;
