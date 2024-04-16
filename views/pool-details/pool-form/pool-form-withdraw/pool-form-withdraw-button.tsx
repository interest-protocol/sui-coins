import { Button, Motion } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSignTransactionBlock } from '@mysten/dapp-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { EXPLORER_URL } from '@/constants';
import { useNetwork } from '@/context/network';
import { useDialog, useMovementClient, useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

import PoolPreview from '../pool-form-preview';
import { useWithdraw } from './pool-form-withdraw.hooks';

const PoolFormWithdrawButton: FC = () => {
  const network = useNetwork();
  const withdraw = useWithdraw();
  const client = useMovementClient();
  const account = useCurrentAccount();
  const { coinsMap, mutate } = useWeb3();
  const { dialog, handleClose } = useDialog();
  const signTransactionBlock = useSignTransactionBlock();
  const { setModal, handleClose: closeModal } = useModal();
  const { getValues, control, setValue } = useFormContext<PoolForm>();

  const lpCoin = useWatch({ control, name: 'lpCoin' });

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

  useEffect(() => {
    if (lpCoin && coinsMap) {
      if (
        !coinsMap[lpCoin.type]?.balance ||
        FixedPointMath.toBigNumber(lpCoin.value, lpCoin.decimals).gt(
          coinsMap[lpCoin.type].balance
        )
      ) {
        setValue(
          'error',
          `The ${lpCoin.symbol} amount is superior than your balance, try to reduce`
        );
        return;
      }
    }
    setValue('error', null);
  }, [lpCoin]);

  const error = useWatch({ control, name: 'error' });

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
