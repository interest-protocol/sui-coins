import { Button } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
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

  const coinsExist = coinsMap[getValues('from.type')];

  const loading = useWatch({ control: control, name: 'loading' });
  const from = useWatch({ control: control, name: 'from' });
  const to = useWatch({ control: control, name: 'to' });

  const fromValue = from?.value ?? ZERO_BIG_NUMBER;

  const fromBalance =
    from && coinsMap[from.type] ? coinsMap[from.type].balance : ZERO_BIG_NUMBER;

  const oneCoin = from
    ? FixedPointMath.toBigNumber(1, from.decimals)
    : ZERO_BIG_NUMBER;

  const isGreaterThanBalance = fromBalance.lt(fromValue);

  const isGreaterThanAllowedWhenSui = fromBalance.minus(oneCoin).lt(fromValue);

  const notEnoughBalance = FixedPointMath.toBigNumber(from.value, from.decimals)
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .gt(
      coinsMap[from.type]
        ? BigNumber(coinsMap[from.type].balance)
        : ZERO_BIG_NUMBER
    );

  const ableToSwap =
    from &&
    to &&
    from.type &&
    to.type &&
    !loading &&
    !from.value?.isZero() &&
    Number(to.display) &&
    coinsMap[from.type] &&
    (from.type === SUI_TYPE_ARG
      ? !isGreaterThanAllowedWhenSui
      : !isGreaterThanBalance);

  useEffect(() => {
    if (
      from &&
      Number(from.value) &&
      from.type &&
      String(from.decimals) &&
      coinsMap[from.type]
    ) {
      if (from.type === SUI_TYPE_ARG)
        if (isGreaterThanAllowedWhenSui) {
          setValue('error', 'You must have at least 1 MOV on your wallet');
          return;
        }

      if (isGreaterThanBalance) {
        setValue('error', 'You do not have enough tokens.');
        return;
      }
    }
    setValue('error', null);
  }, [from]);

  const handlePreview = () =>
    setModal(
      <FormProvider {...form}>
        <SwapPreviewModal onClose={handleClose} />
      </FormProvider>,
      {
        custom: true,
      }
    );

  const isEnabled =
    coinsExist &&
    !loading &&
    !notEnoughBalance &&
    Number(from.value) &&
    Number(to.value);

  return (
    <>
      <SwapMessages />
      <Button
        py="s"
        px="xl"
        fontSize="s"
        type="button"
        borderRadius="xs"
        disabled={!ableToSwap}
        onClick={handlePreview}
        variant={isEnabled ? 'filled' : 'tonal'}
        cursor={isEnabled ? 'pointer' : 'not-allowed'}
        bg={isEnabled ? 'filled' : 'outlineContainer'}
        color={isEnabled ? 'surface' : 'outlineVariant'}
      >
        Preview swap
      </Button>
    </>
  );
};

export default SwapPreviewButton;
