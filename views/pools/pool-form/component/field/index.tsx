import { Box, TokenField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { BNBSVG } from '@/svg';
import { parseInputEventToNumberString } from '@/utils';

import { PoolFieldsProps } from './field.types';

const PoolField: FC<PoolFieldsProps> = ({ name, withoutIcon }) => {
  const { register, setValue, getValues } = useFormContext();

  return (
    <TokenField
      Label={
        <Typography
          mb="xs"
          size="medium"
          variant="label"
          color="onSurface"
          textAlign="right"
          textTransform="uppercase"
        >
          Balance:{' '}
          <Typography size="medium" variant="label" color="primary" as="span">
            {getValues(`${name}.balance`)}
          </Typography>
        </Typography>
      }
      placeholder="0"
      TokenIcon={
        withoutIcon ? undefined : (
          <Box
            color="lowestContainer"
            bg="#000"
            width="2.5rem"
            height="2.5rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="0.5rem"
          >
            <BNBSVG maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
          </Box>
        )
      }
      textAlign="right"
      tokenName={getValues(`${name}.symbol`)}
      labelPosition="right"
      {...register(`${name}.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          setValue?.(`${name}.value`, parseInputEventToNumberString(v));
        },
      })}
    />
  );
};

export default PoolField;
