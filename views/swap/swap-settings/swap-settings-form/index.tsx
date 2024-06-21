import { Box, Button, TextField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { ClockSVG, PercentageSVG } from '@/svg';
import { parseInputEventToNumberString } from '@/utils';

import { ISwapSettings, SwapForm } from '../../swap.types';
import SwapAggregatorManager from './swap-aggregator-manager';
import { ManageSlippageProps } from './swap-settings-form.types';

const SLIPPAGE_BUTTONS = ['0.1', '0.5', '1'];

const SwapSettingsForm: FC<ManageSlippageProps> = ({
  handleManageView,
  noAgg,
}) => {
  const { getValues, setValue } = useFormContext<SwapForm>();

  const formTmpSettings = useForm<ISwapSettings>({
    defaultValues: getValues('settings'),
  });

  const setTolerance = (value: string) =>
    formTmpSettings.setValue('slippage', value);

  const onConfirm = () => {
    const settings = formTmpSettings.getValues();

    setValue('settings', settings);

    localStorage.setItem(
      `${LOCAL_STORAGE_VERSION}-sui-coins-settings`,
      JSON.stringify(settings)
    );

    handleManageView();
  };

  return (
    <Box
      py="2xl"
      px="2xl"
      gap="xl"
      bg="onPrimary"
      display="flex"
      flexDirection="column"
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
              py="xs"
              key={v4()}
              borderRadius="xs"
              variant="outline"
              onClick={() => setTolerance(item)}
            >
              {item}%
            </Button>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="body" size="small" mb="0.5rem">
          Price updating interval
        </Typography>
        <Box>
          <TextField
            fontSize="1rem"
            placeholder="1"
            lineHeight="1.75rem"
            nPlaceholder={{ opacity: 0.7 }}
            {...formTmpSettings.register('interval', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                formTmpSettings.setValue?.(
                  'interval',
                  parseInputEventToNumberString(v)
                );
              },
            })}
            fieldProps={{
              borderRadius: 'xs',
              width: ['100%', '100%', '100%', '10rem'],
            }}
            Suffix={
              <Box gap="2xs" display="flex" alignItems="center">
                <Typography variant="label" size="small">
                  (sec)
                </Typography>
                <ClockSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
              </Box>
            }
          />
        </Box>
      </Box>
      {!noAgg && (
        <SwapAggregatorManager
          setValue={formTmpSettings.setValue}
          control={formTmpSettings.control}
        />
      )}
      <Box display="flex" gap="0.5rem" justifyContent="flex-end">
        <Button
          px="l"
          py="s"
          variant="tonal"
          borderRadius="xs"
          bg="rgba(0, 0, 0, 0.08)"
          onClick={handleManageView}
        >
          Cancel
        </Button>
        <Button
          width="100%"
          variant="filled"
          borderRadius="xs"
          textAlign="center"
          onClick={onConfirm}
          justifyContent="center"
        >
          <Typography variant="label" size="large" width="100%">
            Confirm
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default SwapSettingsForm;
