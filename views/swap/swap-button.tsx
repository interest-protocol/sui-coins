import { Button, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { EXPLORER_URL } from '@/constants';
import { useNetwork } from '@/context/network';
import { useDialog } from '@/hooks/use-dialog';
import useSignTxb from '@/hooks/use-sign-txb';
import { useWeb3 } from '@/hooks/use-web3';
import { throwTXIfNotSuccessful } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { useAftermathRouter } from './swap.hooks';

const SwapButton: FC = () => {
  const client = useSuiClient();
  const network = useNetwork();
  const router = useAftermathRouter();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);

  const [explorerLink, setExplorerLink] = useState('');
  const { mutate } = useWeb3();

  const signTransactionBlock = useSignTxb();

  const resetInput = () => {
    formSwap.setValue('from.value', '0');
    formSwap.setValue('to.value', '0');
  };

  const gotoExplorer = () =>
    window.open(explorerLink, '_blank', 'noopener,noreferrer');

  const route = useWatch({ control: formSwap.control, name: 'route' });
  const slippage = useWatch({
    control: formSwap.control,
    name: 'settings.slippage',
  });

  const handleSwap = async () => {
    try {
      if (!route || !currentAccount || status)
        throw new Error('Something went wrong');

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
      mutate();
    }
  };

  const swap = () =>
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
          onClick: () => gotoExplorer(),
        },
        secondaryButton: (
          <Button variant="outline" mr="s" onClick={handleClose}>
            got it
          </Button>
        ),
      },
    });

  return (
    <Button variant="filled" onClick={swap} justifyContent="center">
      <Typography variant="label" size="large">
        {loading ? 'Swapping...' : 'Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
