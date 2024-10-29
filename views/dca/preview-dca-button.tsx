import { Box, Button } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { isSui, ZERO_BIG_NUMBER } from '@/utils';

import { DCAMessagesEnum } from './dca.data';
import { DCAForm } from './dca.types';
import DCAMessages from './dca-messages';
import DCAPreviewModal from './dca-preview-modal';

const PreviewSwapButton: FC = () => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<DCAForm>();
  const { setModal, handleClose } = useModal();

  const { control, setValue } = form;

  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });
  const starting = useWatch({ control, name: 'starting' });
  const price = useWatch({ control, name: 'price' });
  const orders = useWatch({ control, name: 'orders' });
  const error = useWatch({ control, name: 'error' });

  const fromValue = from?.value ?? ZERO_BIG_NUMBER;

  const fromBalance =
    from && coinsMap[from.type] ? coinsMap[from.type].balance : ZERO_BIG_NUMBER;

  const oneCoin = from
    ? FixedPointMath.toBigNumber(1, from.decimals)
    : ZERO_BIG_NUMBER;

  const isGreaterThanBalance = fromBalance.lt(fromValue);

  const isGreaterThanAllowedWhenSui = fromBalance.minus(oneCoin).lt(fromValue);

  const ableToSwap =
    !error &&
    from &&
    to &&
    from.type &&
    to.type &&
    price &&
    !starting &&
    !from.value?.isZero() &&
    coinsMap[from.type] &&
    (isSui(from.type) ? !isGreaterThanAllowedWhenSui : !isGreaterThanBalance);

  useEffect(() => {
    if (
      from &&
      Number(from.value) &&
      from.type &&
      String(from.decimals) &&
      coinsMap[from.type]
    ) {
      if (isSui(from.type))
        if (isGreaterThanAllowedWhenSui) {
          setValue('error', DCAMessagesEnum.leastOneSui);
          return;
        }

      if (isGreaterThanBalance) {
        setValue('error', DCAMessagesEnum.notEnoughToken);
        return;
      }

      if (
        from.usdValue &&
        from.usdValue * (Number(from.display) / orders) < 3
      ) {
        setValue('error', DCAMessagesEnum.dcaOrderMinAmount);
        return;
      }
    }

    setValue('error', null);
  }, [from, to, orders]);

  const handlePreview = () =>
    setModal(
      <FormProvider {...form}>
        <DCAPreviewModal onClose={handleClose} />
      </FormProvider>,
      { custom: true }
    );

  return (
    <>
      <DCAMessages />
      <Box my="l" display="flex" alignItems="center" justifyContent="center">
        <Button
          py="s"
          px="xl"
          fontSize="s"
          type="button"
          variant="filled"
          borderRadius="xs"
          disabled={!ableToSwap}
          onClick={form.handleSubmit(handlePreview)}
        >
          {starting ? 'Starting DCA...' : 'Start DCA'}
        </Button>
      </Box>
    </>
  );
};

export default PreviewSwapButton;
