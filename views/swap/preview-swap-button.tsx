import { Box, Button } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { fetchCoinMetadata, isSui, ZERO_BIG_NUMBER } from '@/utils';

import { SwapMessagesEnum } from './swap.data';
import { SwapForm } from './swap.types';
import SwapMessages from './swap-messages';
import SwapPreviewModal from './swap-preview-modal';

const PreviewSwapButton: FC = () => {
  fetchCoinMetadata({
    network: Network.MAINNET,
    type: '0x9eed28fc98688a799fe51aa6ed39b851bd09d950fc785b2d7c9f543796254631::drip::DRIP',
  }).then(console.log);

  const { coinsMap } = useWeb3();
  const form = useFormContext<SwapForm>();
  const { setModal, handleClose } = useModal();

  const { control, setValue } = form;

  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });
  const swapping = useWatch({ control, name: 'swapping' });

  const fromValue = from?.value ?? ZERO_BIG_NUMBER;

  const fromBalance =
    from && coinsMap[from.type] ? coinsMap[from.type].balance : ZERO_BIG_NUMBER;

  const oneCoin = from
    ? FixedPointMath.toBigNumber(1, from.decimals)
    : ZERO_BIG_NUMBER;

  const isGreaterThanBalance = fromBalance.lt(fromValue);

  const isGreaterThanAllowedWhenSui = fromBalance.minus(oneCoin).lt(fromValue);

  const ableToSwap =
    from &&
    to &&
    from.type &&
    to.type &&
    !swapping &&
    !from.value?.isZero() &&
    Number(to.display) &&
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
          setValue('error', SwapMessagesEnum.leastOneSui);
          return;
        }

      if (isGreaterThanBalance) {
        setValue('error', SwapMessagesEnum.notEnoughToken);
        return;
      }
    }

    setValue('error', null);
  }, [from, to]);

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
      <Box my="l" display="flex" alignItems="center" justifyContent="center">
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
          {swapping ? 'swapping...' : 'Preview swap'}
        </Button>
      </Box>
    </>
  );
};

export default PreviewSwapButton;
