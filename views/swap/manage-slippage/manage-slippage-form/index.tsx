import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { TextField } from 'elements';
import { ChangeEvent, FC } from 'react';
import { useForm } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { ISwapSettingsForm } from '../../swap.types';
import { ManageSlippageProps } from '../manage-slippage-form.types';

const ManageSlippageForm: FC<ManageSlippageProps> = ({
  formSettings,
  handleManageView,
}) => {
  const formTmpSettings = useForm<ISwapSettingsForm>({
    defaultValues: formSettings.getValues(),
  });

  const setTolerance = (value: string) =>
    formTmpSettings.setValue('slippage', value);

  const setSpeed = (value: 'normal' | 'fast' | 'instant') =>
    formTmpSettings.setValue('speed', value);

  const onConfirm = () => {
    formSettings.setValue('speed', formTmpSettings.getValues('speed'));
    formSettings.setValue('slippage', formTmpSettings.getValues('slippage'));
    formSettings.setValue('deadline', formTmpSettings.getValues('deadline'));
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
          />
          <Button
            variant="outline"
            textAlign="center"
            onClick={() => setTolerance('0.1')}
          >
            <Typography variant="label" size="large" width="100%">
              0.1 %
            </Typography>
          </Button>
          <Button
            variant="outline"
            textAlign="center"
            onClick={() => setTolerance('0.5')}
          >
            <Typography variant="label" size="large" width="100%">
              0.5 %
            </Typography>
          </Button>
          <Button
            variant="outline"
            textAlign="center"
            onClick={() => setTolerance('1')}
          >
            <Typography variant="label" size="large" width="100%">
              1 %
            </Typography>
          </Button>
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
          <Button
            variant="outline"
            textAlign="center"
            onClick={() => setSpeed('normal')}
          >
            <Typography variant="label" size="large" width="100%">
              Normal
            </Typography>
          </Button>
          <Button
            variant="outline"
            textAlign="center"
            onClick={() => setSpeed('fast')}
          >
            <Typography variant="label" size="large" width="100%">
              Fast
            </Typography>
          </Button>
          <Button
            variant="outline"
            textAlign="center"
            onClick={() => setSpeed('instant')}
          >
            <Typography variant="label" size="large" width="100%">
              Instant
            </Typography>
          </Button>
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
