import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { EXPLORER_URL, Network } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import { useWeb3 } from '@/hooks/use-web3';
import { throwTXIfNotSuccessful, ZERO_BIG_NUMBER } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { useAftermathRouter } from './swap.hooks';

const SwapButton: FC = () => {
  const client = useSuiClient();
  const router = useAftermathRouter();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();
  const { dialog, handleClose } = useDialog();

  const { mutate } = useWeb3();

  const signTransactionBlock = useSignTransactionBlock();

  const resetInput = () => {
    formSwap.setValue('to.display', '0');
    formSwap.setValue('from.display', '0');
    formSwap.setValue('from.value', ZERO_BIG_NUMBER);
  };

  const route = useWatch({ control: formSwap.control, name: 'route' });

  const swapping = useWatch({
    control: formSwap.control,
    name: 'swapping',
  });

  const readyToSwap = useWatch({
    control: formSwap.control,
    name: 'readyToSwap',
  });

  const slippage = useWatch({
    control: formSwap.control,
    name: 'settings.slippage',
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
      if (!route || !currentAccount) throw new Error('Something went wrong');

      formSwap.setValue('swapping', true);

      const txb = await router.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: route,
        slippage: Number(slippage),
      });

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
          account: currentAccount,
        });

      const tx = await client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
      });

      throwTXIfNotSuccessful(tx);

      formSwap.setValue(
        'explorerLink',
        `${EXPLORER_URL[network as Network]}/tx/${tx.digest}`
      );
    } finally {
      resetInput();
      formSwap.setValue('swapping', false);
      mutate();
    }
  };

  const swap = () =>
    readyToSwap &&
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
          <Button variant="outline" mr="s" onClick={handleClose}>
            got it
          </Button>
        ),
      },
    });

  return (
    <Button
      onClick={swap}
      variant="filled"
      justifyContent="center"
      disabled={!readyToSwap}
    >
      <Typography variant="label" size="large">
        {swapping ? 'Swapping...' : 'Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
