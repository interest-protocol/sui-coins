import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { useDialog, useWeb3 } from '@/hooks';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { useSwap } from './swap.hooks';
import { logSwap } from './swap.utils';

const SwapButton = () => {
  const swap = useSwap();
  const network = useNetwork();
  const { mutate } = useWeb3();
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const signTransactionBlock = useSignTransactionBlock();

  const resetInput = () => {
    formSwap.setValue('to.value', '0');
    formSwap.setValue('from.value', '0');
  };

  const gotoExplorer = () => {
    window.open(
      formSwap.getValues('explorerLink'),
      '_blank',
      'noopener,noreferrer'
    );

    formSwap.setValue('explorerLink', '');
  };

  const handleSwap = async () => {
    try {
      setLoading(true);

      const txb = await swap();

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
          account: currentAccount!,
        });

      const tx = await client.executeTransactionBlock({
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
        transactionBlock: transactionBlockBytes,
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(tx, network);

      const { from, to } = formSwap.getValues();

      logSwap(currentAccount!.address, from, to);
    } catch (e) {
      console.log({ e });
      throw e;
    } finally {
      resetInput();
      setLoading(false);
      handleClose();
      mutate();
    }
  };

  const onSwap = () =>
    dialog.promise(handleSwap(), {
      loading: {
        title: 'Swapping...',
        message: 'We are swapping, and you will let you know when it is done',
      },
      error: {
        title: 'Swap Failure',
        message:
          'Your swap failed, please try to increment your slippage and try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
      success: {
        title: 'Swap Successfully',
        message:
          'Your swap was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: (
          <Button
            mr="s"
            color="onSurface"
            variant="outline"
            onClick={handleClose}
          >
            got it
          </Button>
        ),
      },
    });

  return (
    <Button variant="filled" onClick={onSwap} justifyContent="center">
      <Typography variant="label" size="large">
        {loading ? 'Swapping...' : 'Confirm Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
