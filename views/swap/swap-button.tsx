import { Button, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { EXPLORER_URL } from '@/constants';
import { useNetwork } from '@/context/network';
import { useDialog } from '@/hooks/use-dialog';
import useSignTxb from '@/hooks/use-sign-txb';
import { useWeb3 } from '@/hooks/use-web3';
import { throwTXIfNotSuccessful } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { useAftermathRouter } from './swap-manager/swap-manager.hooks';

const SwapButton = () => {
  const client = useSuiClient();
  const network = useNetwork();
  const router = useAftermathRouter();
  const currentAccount = useCurrentAccount();
  const { dialog, handleClose } = useDialog();
  const formSwap = useFormContext<SwapForm>();
  const [loading, setLoading] = useState(false);
  const { mutate } = useWeb3();

  const signTransactionBlock = useSignTxb();

  const resetInput = () => {
    formSwap.setValue('from.value', '0');
    formSwap.setValue('to.value', '0');
  };

  const [explorerLink, setExplorerLink] = useState('');

  const gotoExplorer = () =>
    window.open(explorerLink, '_blank', 'noopener,noreferrer');

  const route = useWatch({ control: formSwap.control, name: 'route' });
  const slippage = useWatch({
    control: formSwap.control,
    name: 'settings.slippage',
  });

  const handleSwap = async () => {
    try {
      if (!route || !currentAccount) return;

      setLoading(true);

      const txb = await router.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: route,
        slippage: Number(slippage),
      });

      const { signature, transactionBlockBytes } = await signTransactionBlock({
        transactionBlock: txb,
      });

      const tx = await client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
      });

      throwTXIfNotSuccessful(tx);

      setExplorerLink(`${EXPLORER_URL[network]}/txblock/${tx.digest}`);
    } finally {
      resetInput();
      setLoading(false);
      await mutate();
    }
  };

  const swap = () => {
    dialog.promise(handleSwap(), {
      loading: {
        title: 'Swapping...',
        message: 'We are swapping, and you will let you know when it is done',
      },
      success: {
        onClose: handleClose,
        title: 'Swap Successfully',
        message:
          'Your swap was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: {
          label: 'got it',
          onClick: handleClose,
        },
      },
      error: {
        onClose: handleClose,
        title: 'Swap Failure',
        message:
          'Your swap failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
    });
  };

  return (
    <Button onClick={swap} variant="filled" justifyContent="center">
      <Typography variant="label" size="large">
        {loading ? 'Swapping...' : 'Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
