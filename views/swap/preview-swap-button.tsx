import { Box, Button } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { FC, useEffect } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from './swap.types';
import SwapMessages from './swap-messages';
import SwapPreviewModal from './swap-preview-modal';

const PreviewSwapButton: FC = () => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<SwapForm>();
  const { setModal, handleClose } = useModal();

  const { control, setValue } = form;

  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });

  const fromValue = from?.value ?? ZERO_BIG_NUMBER;

  const fromBalance =
    from && coinsMap[from.type] ? coinsMap[from.type].balance : ZERO_BIG_NUMBER;

  const oneCoin = from
    ? FixedPointMath.toBigNumber(1, from.decimals)
    : ZERO_BIG_NUMBER;

  const isGreaterThanBalance = fromBalance.lt(fromValue);

  const isGreaterThanAllowedWhenSui = fromBalance.minus(oneCoin).lt(fromValue);

  console.log({
    balance: fromBalance.minus(oneCoin).toString(),
    from: fromValue.toString(),
  });

  const ableToSwap =
    from &&
    to &&
    from.type &&
    to.type &&
    Number(from.value) &&
    Number(to.display) &&
    String(from.decimals) &&
    coinsMap[from.type] &&
    from.type === SUI_TYPE_ARG
      ? !isGreaterThanAllowedWhenSui
      : !isGreaterThanBalance;

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
          setValue('error', 'You must have at least 1 SUI on your wallet');
          return;
        }

      if (isGreaterThanBalance) {
        setValue('error', 'You do not have enough tokens.');
        return;
      }
    }
    setValue('error', null);
  }, [from]);

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
    <>
      <SwapMessages />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="l"
        mb="l"
      >
        <Button
          py="s"
          px="xl"
          fontSize="s"
          type="button"
          variant="filled"
          borderRadius="xs"
          disabled={!ableToSwap}
          onClick={handlePreview}
        >
          Preview swap
        </Button>
      </Box>
    </>
  );
};

export default PreviewSwapButton;
