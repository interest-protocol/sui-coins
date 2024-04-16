import { Box, Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import SwapMessages from './swap-messages';
import SwapPreviewModal from './swap-preview-modal';

const SwapPreviewButton: FC = () => {
  const { coinsMap } = useWeb3();
  const { setModal, handleClose } = useModal();
  const form = useFormContext<SwapForm>();
  const { getValues, setValue, control } = form;
  const error = useWatch({
    control,
    name: 'error',
  });

  const coinsExist = coinsMap[getValues('from.type')];

  const loading = useWatch({ control: control, name: 'loading' });
  const from = useWatch({ control: control, name: 'from' });
  const to = useWatch({ control: control, name: 'to' });

  const notEnoughBalance = FixedPointMath.toBigNumber(
    from?.value ?? '0',
    from?.decimals ?? 0
  )
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .gt(
      from && coinsMap[from.type]
        ? BigNumber(coinsMap[from.type].balance)
        : ZERO_BIG_NUMBER
    );

  const isEnabled =
    from &&
    to &&
    !from.isFetchingSwap &&
    !to.isFetchingSwap &&
    coinsExist &&
    !loading &&
    !notEnoughBalance &&
    Number(from.value) &&
    Number(to.value);

  const handlePreview = () => {
    setValue('readyToSwap', false);
    setModal(
      <FormProvider {...form}>
        <SwapPreviewModal onClose={handleClose} />
      </FormProvider>,
      {
        custom: true,
      }
    );
  };

  return (
    <Box gap="2xs" display="flex" flexDirection="column">
      {error && <SwapMessages />}
      <Box my="l" display="flex" alignItems="center" justifyContent="center">
        <Button
          py="s"
          px="xl"
          fontSize="s"
          type="button"
          borderRadius="xs"
          disabled={!isEnabled}
          onClick={handlePreview}
          variant={isEnabled ? 'filled' : 'tonal'}
          cursor={isEnabled ? 'pointer' : 'not-allowed'}
          bg={isEnabled ? 'filled' : 'outlineContainer'}
          color={isEnabled ? 'surface' : 'outlineVariant'}
        >
          Preview swap
        </Button>
      </Box>
    </Box>
  );
};

export default SwapPreviewButton;
