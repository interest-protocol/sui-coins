import { Box, Button } from '@interest-protocol/ui-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';

import { DCAForm } from './dca.types';
import SwapMessages from './dca-messages';
import SwapPreviewModal from './dca-preview-modal';

const PreviewSwapButton: FC = () => {
  const { coinsMap } = useWeb3();
  const form = useFormContext<DCAForm>();
  const { setModal, handleClose } = useModal();

  const { control, setValue } = form;

  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });

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
      ).gt(BigNumber(coinsMap[from.type]?.balance ?? 0));

      if (isGreaterThanBalance) {
        setValue('error', 'You do not have enough tokens.');
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
        setValue('error', 'You must have at least 1 SUI on your wallet');
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

  return (
    <>
      <SwapMessages />
      <Box my="l" display="flex" justifyContent="center" alignItems="center">
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
          Preview DCA
        </Button>
      </Box>
    </>
  );
};

export default PreviewSwapButton;
