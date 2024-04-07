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
  const network = useNetwork();
  const formSwap: UseFormReturn<SwapForm> = useFormContext();
  const [loading, setLoading] = useState(false);
  const { mutate } = useWeb3();
  const swap = useSwap();
  const client = useSuiClient();
  const signTransactionBlock = useSignTransactionBlock();
  const currentAccount = useCurrentAccount();
  const { handleClose } = useModal();

  const resetInput = () => {
    formSwap.setValue('from.value', '0');
    formSwap.setValue('to.value', '0');
  };

  const handleSwap = async () => {
    try {
      setLoading(true);

      const txb = swap();
      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
          account: currentAccount!,
        });

      const tx = await client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(tx, network);
    } finally {
      resetInput();
      setLoading(false);
      handleClose();
      await mutate();
    }
  };

  const onSwap = () => {
    toast.promise(handleSwap(), {
      loading: 'Loading',
      success: `Swapped successfully`,
      error: 'Failed to swap',
    });
  };

  return (
    <Button variant="filled" onClick={onSwap} justifyContent="center">
      <Typography variant="label" size="large">
        {loading ? 'Swapping...' : 'Confirm Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
