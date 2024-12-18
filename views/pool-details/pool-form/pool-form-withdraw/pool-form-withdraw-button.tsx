import { Button, Motion } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ExplorerMode } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { signAndExecute, throwTXIfNotSuccessful } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

import PoolPreview from '../pool-form-preview';
import { useWithdraw } from './pool-form-withdraw.hooks';

const PoolFormWithdrawButton: FC = () => {
  const { mutate } = useWeb3();
  const withdraw = useWithdraw();
  const suiClient = useSuiClient();
  const getExplorerUrl = useGetExplorerUrl();
  const currentAccount = useCurrentAccount();
  const { dialog, handleClose } = useDialog();
  const signTransaction = useSignTransaction();
  const { setModal, handleClose: closeModal } = useModal();
  const { getValues, control, setValue } = useFormContext<PoolForm>();

  const error = useWatch({ control, name: 'error' });

  const handleWithdraw = async () => {
    try {
      if (!currentAccount) return;

      const tx = await withdraw(getValues());

      const tx2 = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      throwTXIfNotSuccessful(tx2);

      setValue(
        'explorerLink',
        getExplorerUrl(tx2.digest, ExplorerMode.Transaction)
      );
      setValue('executionTime', tx2.time);
    } finally {
      mutate();
    }
  };

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    setValue('explorerLink', '');
  };

  const onWithdraw = () => {
    closeModal();
    dialog.promise(handleWithdraw(), {
      loading: () => ({
        title: 'Withdrawing...',
        message:
          'We are Withdrawing, and you will let you know when it is done',
      }),
      success: () => ({
        title: 'Withdraw Successfully',
        message: `Your withdraw was successfully, and you can check it on the Explorer. Tx finalized in ${+(
          getValues('executionTime') / 1000
        ).toFixed(2)} sec!`,
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      }),
      error: () => ({
        title: 'Withdraw Failure',
        message:
          'Your withdrawing failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
    });
  };

  const removeLiquidity = () =>
    !error &&
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} onSubmit={onWithdraw} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Button
      py="s"
      mt="xl"
      mx="auto"
      variant="filled"
      disabled={!!error}
      width="max-content"
      onClick={removeLiquidity}
    >
      Withdraw
    </Button>
  );
};

export default PoolFormWithdrawButton;
