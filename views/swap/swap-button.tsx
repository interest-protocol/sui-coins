import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL, Network } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import {
  signAndExecute,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { SwapMessagesEnum } from './swap.data';
import { useSwap } from './swap.hooks';

const SwapButton: FC = () => {
  const swap = useSwap();
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();
  const { dialog, handleClose } = useDialog();

  const signTransactionBlock = useSignTransactionBlock();

  const resetInput = () => {
    formSwap.setValue('to.display', '0');
    formSwap.setValue('from.display', '0');
    formSwap.setValue('from.value', ZERO_BIG_NUMBER);
  };

  const swapping = useWatch({
    control: formSwap.control,
    name: 'swapping',
  });

  const readyToSwap = useWatch({
    control: formSwap.control,
    name: 'readyToSwap',
  });

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
      invariant(currentAccount, 'Need to connect wallet');

      formSwap.setValue('swapping', true);

      const txb = (await swap(formSwap.getValues())) as TransactionBlock;

      const tx = await signAndExecute({
        txb,
        suiClient,
        currentAccount,
        signTransactionBlock,
      });

      throwTXIfNotSuccessful(tx);

      formSwap.setValue(
        'explorerLink',
        `${EXPLORER_URL[network as Network]}/tx/${tx.digest}`
      );
    } finally {
      resetInput();
      formSwap.setValue('swapping', false);
    }
  };

  const onSwap = () =>
    readyToSwap &&
    dialog.promise(handleSwap(), {
      loading: {
        title: 'Swapping...',
        message: SwapMessagesEnum.swapping,
      },
      error: {
        title: 'Swap Failure',
        message: SwapMessagesEnum.swapFailure,
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
      success: {
        title: 'Swap Successfully',
        message: SwapMessagesEnum.swapSuccess,
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: (
          <Button variant="outline" mr="s" onClick={handleClose}>
            got it
          </Button>
        ),
      },
    });

  return (
    <Button
      onClick={onSwap}
      variant="filled"
      disabled={!readyToSwap}
      justifyContent="center"
    >
      <Typography variant="label" size="large">
        {swapping ? 'Swapping...' : 'Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
