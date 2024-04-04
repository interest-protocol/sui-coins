import { Box, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { ISendSimpleForm } from '../send-simple.types';
import SelectObject from './select-object';
import { SendFormSelectObjectProps } from './send-select-object.types';
import SendSelectObjectHeader from './send-select-object-header';

const SendFormSelectObject: FC<SendFormSelectObjectProps> = ({ index }) => {
  const { register, control, setValue } = useFormContext<ISendSimpleForm>();

  const display = useWatch({ control, name: `objects.${index}.display` });
  const editable = useWatch({ control, name: `objects.${index}.editable` });

  return (
    <Box flex="1">
      <SendSelectObjectHeader index={index} />
      <TextField
        placeholder="0"
        textAlign="right"
        opacity={editable ? 1 : 0.7}
        Prefix={<SelectObject index={index} />}
        cursor={editable ? 'initial' : 'not-allowed'}
        caretColor={editable ? 'black' : 'transparent'}
        fieldProps={{ height: '3.2rem', borderRadius: 'xs' }}
        {...register(`objects.${index}.value`, {
          onChange: (v) =>
            setValue(
              `objects.${index}.value`,
              !editable
                ? '1'
                : parseInputEventToNumberString(
                    v,
                    FixedPointMath.toNumber(
                      (display as CoinObject)?.balance ?? ZERO_BIG_NUMBER,
                      (display as CoinObject)?.decimals ?? 0
                    )
                  )
            ),
        })}
      />
    </Box>
  );
};

export default SendFormSelectObject;
