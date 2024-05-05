import { Button, Motion } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { EXPLORER_URL } from '@/constants';
import { useNetwork } from '@/context/network';
import { useDialog } from '@/hooks/use-dialog';
import { useModal } from '@/hooks/use-modal';
import { useWeb3 } from '@/hooks/use-web3';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

import PoolPreview from '../pool-form-preview';
import { useWithdraw } from './pool-form-withdraw.hooks';

const PoolFormWithdrawButton: FC = () => {
  const network = useNetwork();
  const { mutate } = useWeb3();
  const client = useSuiClient();
  const withdraw = useWithdraw();
  const account = useCurrentAccount();
  const { dialog, handleClose } = useDialog();
  const signTransactionBlock = useSignTransactionBlock();
  const { setModal, handleClose: closeModal } = useModal();
  const { getValues, control, setValue } = useFormContext<PoolForm>();

  const error = useWatch({ control, name: 'error' });

  const handleWithdraw = async () => {
    try {
      if (!account) return;

      const txb = await withdraw(getValues(), account);

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
          account: account,
        });

      const tx = await client.executeTransactionBlock({
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
        transactionBlock: transactionBlockBytes,
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(tx, network);

      setValue('explorerLink', `${EXPLORER_URL[network]}/tx/${tx.digest}`);
    } finally {
      await mutate();
    }
  };

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    setValue('explorerLink', '');
  };

  const onWithdraw = () => {
    closeModal();
    dialog.promise(handleWithdraw(), {
      loading: {
        title: 'Withdrawing...',
        message:
          'We are Withdrawing, and you will let you know when it is done',
      },
      success: {
        title: 'Withdraw Successfully',
        message:
          'Your withdraw was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      },
      error: {
        title: 'Withdraw Failure',
        message:
          'Your withdrawing failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
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
