import { Box, Button, TextField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { ClockSVG, PercentageSVG } from '@/svg';
import { parseInputEventToNumberString } from '@/utils';

import { ISwapSettings } from '../../swap.types';
import { ManageSlippageProps } from '../manage-slippage-form.types';

const SLIPPAGE_BUTTONS = ['0.1', '0.5', '1'];

const ManageSlippageForm: FC<ManageSlippageProps> = ({ handleManageView }) => {
  const { getValues, setValue } = useFormContext();

  const formTmpSettings = useForm<ISwapSettings>({
    defaultValues: getValues('settings'),
  });

  const setTolerance = (value: string) =>
    formTmpSettings.setValue('slippage', value);

  const onConfirm = () => {
    setValue('settings.speed', formTmpSettings.getValues('speed'));
    setValue('settings.slippage', formTmpSettings.getValues('slippage'));
    setValue('settings.deadline', formTmpSettings.getValues('deadline'));
    handleManageView();
  };

  return (
    <Box
      py="2xl"
      px="2xl"
      display="flex"
      flexDirection="column"
      gap="1.5rem"
      bg="onPrimary"
    >
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
            fieldProps={{
              borderRadius: 'xs',
              mr: 'xs',
              width: ['100%', '100%', '100%', '114%'],
            }}
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
              borderRadius="xs"
              variant="outline"
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
              borderRadius: 'xs',
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
          borderRadius="xs"
          px="l"
          py="s"
          bg="rgba(0, 0, 0, 0.08)"
          onClick={handleManageView}
        >
          Cancel
        </Button>
        <Button variant="filled" borderRadius="xs" onClick={onConfirm}>
          <Typography variant="label" size="large" width="100%">
            Confirm
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ManageSlippageForm;
