import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { useState } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { useSwap } from './swap.hooks';

const SwapButton = () => {
  const swap = useSwap();
  const network = useNetwork();
  const { mutate } = useWeb3();
  const client = useSuiClient();
  const { handleClose } = useModal();
  const currentAccount = useCurrentAccount();
  const [loading, setLoading] = useState(false);
  const signTransactionBlock = useSignTransactionBlock();
  const formSwap: UseFormReturn<SwapForm> = useFormContext();

  const resetInput = () => {
    formSwap.setValue('from.value', '0');
    formSwap.setValue('to.value', '0');
  };

  const handleSwap = async () => {
    const loadingToastId = toast.loading('Swapping...');

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
      toast.success('Swapped successfully');
    } catch (e) {
      toast.error((e as Error).message ?? 'Failed to swap');
    } finally {
      toast.dismiss(loadingToastId);
      resetInput();
      setLoading(false);
      handleClose();
      await mutate();
    }
  };

  return (
    <Button variant="filled" onClick={handleSwap} justifyContent="center">
      <Typography variant="label" size="large">
        {loading ? 'Swapping...' : 'Confirm Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
