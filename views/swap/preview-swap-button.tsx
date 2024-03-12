import { Button } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';

import { SwapForm } from './swap.types';
import SwapPreviewModal from './swap-preview-modal';

const PreviewSwapButton: FC = () => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<SwapForm>();
  const { setModal, handleClose } = useModal();

  const { control, setError } = form;

  const { from, to } = useWatch({ control });

  const ableToSwap =
    from &&
    to &&
    from.type &&
    to.type &&
    Number(from.value) &&
    Number(to.value) &&
    String(from.decimals) &&
    coinsMap[from.type] &&
    (BigNumber(Number(from.value!) * 10 ** from.decimals!).lte(
      BigNumber(coinsMap[from.type].balance)
    ) ||
      (from.type === SUI_TYPE_ARG &&
        BigNumber(Number(from.value!) * 10 ** from.decimals!).lte(
          BigNumber(Number(coinsMap[from.type].balance) - 10 ** from.decimals!)
        )));

  useEffect(() => {
    if (from && Number(from.value) && from.type && String(from.decimals)) {
      const isGreaterThanBalance = BigNumber(
        Number(from.value!) * 10 ** from.decimals!
      ).gt(
        BigNumber(coinsMap[from.type].balance).minus(
          BigNumber(from.type === SUI_TYPE_ARG ? 10 ** from.decimals! : 0)
        )
      );

      if (isGreaterThanBalance) {
        setError('from.value', {
          type: 'max',
          message: 'You do not have enough tokens.',
        });
        return;
      }

      const isGreaterThanAllowedForSui = BigNumber(
        Number(from.value!) * 10 ** from.decimals!
      ).gt(
        BigNumber(coinsMap[from.type].balance).minus(
          BigNumber(10 ** from.decimals!)
        )
      );

      if (from.type === SUI_TYPE_ARG && isGreaterThanAllowedForSui) {
        setError('from.value', {
          type: 'max',
          message: 'You must have at least 1SUI on your wallet',
        });
        return;
      }
    }
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

  return (
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
  );
};

export default PreviewSwapButton;
