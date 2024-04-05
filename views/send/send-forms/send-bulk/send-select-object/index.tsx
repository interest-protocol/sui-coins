import { Box, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { ISendBulkForm } from '../send-bulk.types';
import SelectObject from './select-object';
import SendSelectObjectHeader from './send-select-object-header';

const SendSelectObject: FC = () => {
  const { register, control, setValue } = useFormContext<ISendBulkForm>();
  const { coinsMap } = useWeb3();
  const type = useWatch({ control, name: 'object.type' });
  const balance = coinsMap[type]?.balance;

  const decimals = useWatch({ control, name: 'object.decimals' });

  return (
    <Box flex="1">
      <SendSelectObjectHeader />
      <TextField
        placeholder="0"
        textAlign="right"
        Prefix={<SelectObject />}
        nPlaceholder={{ opacity: 0.7 }}
        fieldProps={{ height: '3.5rem', borderRadius: 'xs' }}
        {...register('object.value', {
          onChange: (v) =>
            setValue(
              'object.value',
              parseInputEventToNumberString(
                v,
                FixedPointMath.toNumber(
                  balance ?? ZERO_BIG_NUMBER,
                  decimals ?? 0
                )
              )
            ),
        })}
      />
    </Box>
  );
};

export default SendSelectObject;
