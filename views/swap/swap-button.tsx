import { Button, Dialog, Typography } from '@interest-protocol/ui-kit';
import { DialogProps } from '@interest-protocol/ui-kit/dist/components/dialog/dialog.types';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { EXPLORER_URL } from '@/constants';
import { useNetwork } from '@/context/network';
import useSignTxb from '@/hooks/use-sign-txb';
import { useWeb3 } from '@/hooks/use-web3';
import { throwTXIfNotSuccessful } from '@/utils';
import { SwapForm, SwapPreviewModalProps } from '@/views/swap/swap.types';

import { useAftermathRouter } from './swap-manager/swap-manager.hooks';

const SwapButton: FC<SwapPreviewModalProps> = ({ onClose }) => {
  const client = useSuiClient();
  const network = useNetwork();
  const router = useAftermathRouter();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();

  const [explorerLink, setExplorerLink] = useState('');
  const { mutate } = useWeb3();

  const signTransactionBlock = useSignTxb();

  const resetInput = () => {
    formSwap.setValue('from.value', '0');
    formSwap.setValue('to.value', '0');
  };

  const gotoExplorer = () =>
    window.open(explorerLink, '_blank', 'noopener,noreferrer');

  const status = useWatch({ control: formSwap.control, name: 'swapStatus' });
  const route = useWatch({ control: formSwap.control, name: 'route' });
  const slippage = useWatch({
    control: formSwap.control,
    name: 'settings.slippage',
  });

  const handleSwap = async () => {
    try {
      if (!route || !currentAccount || status)
        throw new Error('Something went wrong');

      formSwap.setValue('swapStatus', 'loading');

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

      formSwap.setValue('swapStatus', 'success');
      setExplorerLink(`${EXPLORER_URL[network]}/txblock/${tx.digest}`);
    } catch (e) {
      formSwap.setValue('swapStatus', 'error');
    }
  };

  const handleClose = () => {
    formSwap.setValue('swapStatus', null);
    resetInput();
    mutate();
    onClose();
  };

  const dialogProps: Record<
    'loading' | 'success' | 'error',
    Omit<DialogProps, 'isOpen'>
  > = {
    loading: {
      status: 'loading',
      title: 'Swapping...',
      message: 'We are swapping, and you will let you know when it is done',
    },
    error: {
      status: 'error',
      title: 'Swap Failure',
      message:
        'Your swap failed, please try to increment your slippage and try again or contact the support team',
      primaryButton: { label: 'Try again', onClick: handleClose },
    },
    success: {
      status: 'success',
      title: 'Swap Successfully',
      message:
        'Your swap was successfully, and you can check it on the Explorer',
      primaryButton: {
        label: 'See on Explorer',
        onClick: () => gotoExplorer(),
      },
      secondaryButton: (
        <Button variant="outline" mr="s" onClick={handleClose}>
          got it
        </Button>
      ),
    },
  };

  return (
    <>
      <Button variant="filled" onClick={handleSwap} justifyContent="center">
        <Typography variant="label" size="large">
          {status === 'loading' ? 'Swapping...' : 'Swap'}
        </Typography>
      </Button>
      {!!status && (
        <Dialog isOpen onClose={handleClose} {...dialogProps[status]} />
      )}
    </>
  );
};

export default SwapButton;
