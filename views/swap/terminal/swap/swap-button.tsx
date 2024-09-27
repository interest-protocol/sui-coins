import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import invariant from 'tiny-invariant';

import {
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';

import { useSwap } from './swap.hooks';
import { SwapForm } from './swap.types';

const SwapButton: FC = () => {
  const swap = useSwap();
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();

  const signTransaction = useSignTransaction();

  const resetInput = () => {
    formSwap.setValue('to.display', '0');
    formSwap.setValue('from.display', '0');
    formSwap.setValue('from.value', ZERO_BIG_NUMBER);
  };

  const loading = useWatch({
    control: formSwap.control,
    name: 'loading',
  });

  const route = useWatch({
    control: formSwap.control,
    name: 'route',
  });

  const swapping = useWatch({
    control: formSwap.control,
    name: 'swapping',
  });

  const readyToSwap = useWatch({
    control: formSwap.control,
    name: 'readyToSwap',
  });

  const handleSwap = async () => {
    if (!readyToSwap) return;

    const toastId = toast.loading('Swapping...');
    try {
      invariant(currentAccount, 'Need to connect wallet');

      formSwap.setValue('swapping', true);

      const tx = await swap(formSwap.getValues());

      const tx2 = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      throwTXIfNotSuccessful(tx2);

      showTXSuccessToast(tx2, network, 'Swapped successfully');
    } catch (e) {
      toast.error((e as Error).message ?? 'Something went wrong!');
    } finally {
      toast.dismiss(toastId);
      resetInput();
      formSwap.setValue('swapping', false);
    }
  };

  return (
    <Button
      mx="auto"
      variant="filled"
      onClick={handleSwap}
      justifyContent="center"
      disabled={!currentAccount || loading || !route || !readyToSwap}
    >
      <Typography variant="label" size="large">
        {loading ? 'Loading...' : swapping ? 'Swapping...' : 'Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
