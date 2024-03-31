import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { ZkSendForm } from '../send-form.types';
import SelectObject from './select-object';
import SendSelectObjectHeader from './send-select-object-header';

const SendSelectObject: FC = () => {
  const { register, control, setValue } = useFormContext<ZkSendForm>();

  const editable = useWatch({ control, name: 'object.editable' });
  const display = useWatch({ control, name: 'object.display' });

  return (
    <Box>
      <SendSelectObjectHeader />
      <TextField
        placeholder="0"
        textAlign="right"
        Prefix={<SelectObject />}
        opacity={editable ? 1 : 0.7}
        {...register('object.value', {
          onChange: (v) =>
            setValue(
              'object.value',
              parseInputEventToNumberString(
                v,
                FixedPointMath.toNumber(
                  (display as CoinObject)?.balance ?? ZERO_BIG_NUMBER,
                  (display as CoinObject)?.decimals ?? 0
                )
              )
            ),
        })}
        fieldProps={{ borderRadius: 'xs', height: '3.5rem' }}
      />
      {(display as CoinObject)?.type && (
        <Typography variant="label" size="large" textAlign="right" mt="s">
          Balance:{' '}
          <Typography
            as="strong"
            size="large"
            variant="label"
            color="primary"
            textAlign="right"
          >
            {FixedPointMath.toNumber(
              (display as CoinObject)?.balance ?? ZERO_BIG_NUMBER,
              (display as CoinObject)?.decimals ?? 0
            )}
          </Typography>
        </Typography>
      )}
    </Box>
  );
};

export default SendSelectObject;
