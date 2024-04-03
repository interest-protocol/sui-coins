import { Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import SwapPreviewModal from './swap-preview-modal';

const SwapPreviewButton: FC = () => {
  const { coinsMap } = useWeb3();
  const { setModal, handleClose } = useModal();
  const form = useFormContext<SwapForm>();

  const { getValues, control } = form;

  const coinsExist = coinsMap[getValues('from.type')];

  const loading = useWatch({ control: control, name: 'loading' });
  const tokenIn = useWatch({ control: control, name: 'from' });
  const tokenOut = useWatch({ control: control, name: 'to' });

  const notEnoughBalance = FixedPointMath.toBigNumber(
    tokenIn.value,
    tokenIn.decimals
  )
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .gt(
      coinsMap[tokenIn.type]
        ? BigNumber(coinsMap[tokenIn.type].balance)
        : ZERO_BIG_NUMBER
    );

  const handlePreview = () => {
    setModal(
      <FormProvider {...form}>
        <SwapPreviewModal onClose={handleClose} />
      </FormProvider>,
      {
        custom: true,
      }
    );
  };

  const isEnabled =
    coinsExist &&
    !loading &&
    !notEnoughBalance &&
    Number(tokenIn.value) &&
    Number(tokenOut.value);

  return (
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
  );
};

export default SwapPreviewButton;
