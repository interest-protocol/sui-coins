import { Box, Button, TextField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { ClockSVG, PercentageSVG } from '@/svg';
import { parseInputEventToNumberString } from '@/utils';

import { ISwapSettings } from '../../swap.types';
import { ManageSlippageProps } from '../manage-slippage-form.types';

const SLIPPAGE_BUTTONS = ['0.1', '0.5', '1'];
const TRANSACTION_SPEED_BUTTONS = ['normal', 'fast', 'instant'];

const ManageSlippageForm: FC<ManageSlippageProps> = ({ handleManageView }) => {
  const { getValues, setValue } = useFormContext();

  const formTmpSettings = useForm<ISwapSettings>({
    defaultValues: getValues('settings'),
  });
  const [tmpSpeed, setTmpSpeed] = useState(formTmpSettings.getValues('speed'));

  const setTolerance = (value: string) =>
    formTmpSettings.setValue('slippage', value);

  const setSpeed = (value: 'normal' | 'fast' | 'instant') => {
    formTmpSettings.setValue('speed', value);
    setTmpSpeed(value);
  };

  const onConfirm = () => {
    setValue('settings.speed', formTmpSettings.getValues('speed'));
    setValue('settings.slippage', formTmpSettings.getValues('slippage'));
    setValue('settings.deadline', formTmpSettings.getValues('deadline'));
    handleManageView();
  };

  return (
    <Box py="1rem" px="1rem" display="flex" flexDirection="column" gap="1.5rem">
      <Box>
        <Typography variant="body" size="small" mb="0.5rem">
          Slippage Tolerance
        </Typography>
        <Box
          gap="xs"
          flexDirection="column"
          gridTemplateColumns="4fr repeat(3, auto)"
          display={['flex', 'flex', 'flex', 'grid']}
        >
          <TextField
            fontSize="1rem"
            placeholder="0.1"
            fontFamily="Satoshi"
            {...formTmpSettings.register('slippage', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                formTmpSettings.setValue?.(
                  'slippage',
                  parseInputEventToNumberString(v)
                );
              },
            })}
            fieldProps={{ borderRadius: 'full', width: '100%' }}
            Suffix={
              <Box display="flex">
                <PercentageSVG
                  maxHeight="1.25rem"
                  maxWidth="1.25rem"
                  width="100%"
                />
              </Box>
            }
          />
          {SLIPPAGE_BUTTONS.map((item) => (
            <Button
              key={v4()}
              variant="outline"
              textAlign="center"
              onClick={() => setTolerance(item)}
            >
              <Typography variant="label" size="large" width="100%">
                {item} %
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="body" size="small" mb="0.5rem">
          Transaction Speed
        </Typography>
        <Box
          gap="xs"
          flexDirection="column"
          gridTemplateColumns="repeat(3, 1fr)"
          display={['flex', 'flex', 'flex', 'grid']}
        >
          {TRANSACTION_SPEED_BUTTONS.map((item) => (
            <Button
              key={v4()}
              variant="outline"
              textAlign="center"
              onClick={() => setSpeed(item as 'normal' | 'fast' | 'instant')}
              selected={item == tmpSpeed}
            >
              <Typography variant="label" size="large" width="100%">
                {item}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="body" size="small" mb="0.5rem">
          Transaction deadline
        </Typography>
        <Box>
          <TextField
            fontSize="1rem"
            placeholder="3min"
            lineHeight="1.75rem"
            fontFamily="Satoshi"
            {...formTmpSettings.register('deadline', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                formTmpSettings.setValue?.(
                  'deadline',
                  parseInputEventToNumberString(v)
                );
              },
            })}
            fieldProps={{
              borderRadius: 'full',
              width: ['100%', '100%', '100%', '10rem'],
            }}
            Suffix={
              <Box display="flex">
                <ClockSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
              </Box>
            }
          />
        </Box>
      </Box>
      <Box display="flex" gap="0.5rem" justifyContent="flex-end">
        <Button
          variant="tonal"
          bg="rgba(0, 0, 0, 0.08)"
          onClick={handleManageView}
        >
          Cancel
        </Button>
        <Button variant="filled" onClick={onConfirm}>
          <Typography variant="label" size="large" width="100%">
            Confirm
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ManageSlippageForm;
