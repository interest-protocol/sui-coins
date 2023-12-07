import { TokenField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { SuiBlackSVG } from '@/svg';
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
      TokenIcon={withoutIcon ? undefined : SuiBlackSVG}
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
