import { Button, Motion } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { EXPLORER_URL } from '@/constants';
import { useNetwork } from '@/context/network';
import { useDialog, useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import { isSui, showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { logDepositPool } from '../pool-form.utils';
import PoolPreview from '../pool-form-preview';
import { useDeposit } from './pool-form-deposit.hooks';

const PoolFormDepositButton: FC = () => {
  const network = useNetwork();
  const deposit = useDeposit();
  const client = useSuiClient();
  const { pool } = usePoolDetails();
  const account = useCurrentAccount();
  const { coinsMap, mutate } = useWeb3();
  const { dialog, handleClose } = useDialog();
  const signTransactionBlock = useSignTransactionBlock();
  const { setModal, handleClose: closeModal } = useModal();
  const { getValues, control, setValue } = useFormContext<PoolForm>();

  const tokenList = useWatch({ control, name: 'tokenList' });

  const ableToClick = tokenList.some(({ value }) => Number(value));

  const handleDeposit = async () => {
    try {
      if (!account) return;

      const txb = await deposit(getValues(), account);

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

      setValue('explorerLink', EXPLORER_URL[network](`/txblock/${tx.digest}`));

      logDepositPool(
        account.address,
        getValues('tokenList.0'),
        getValues('tokenList.1'),
        network,
        tx.digest
      );
    } finally {
      mutate();
    }
  };

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    setValue('explorerLink', '');
  };

  const onDeposit = () => {
    closeModal();
    dialog.promise(handleDeposit(), {
      loading: {
        title: 'Depositing...',
        message: 'We are Depositing, and you will let you know when it is done',
      },
      success: {
        title: 'Deposit Successfully',
        message:
          'Your deposit was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      },
      error: {
        title: 'Deposit Failure',
        message:
          'Your deposit failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
    });
  };

  useEffect(() => {
    if (tokenList.length && coinsMap) {
      const coin1 = tokenList[0];
      const coin2 = tokenList[1];

      if (
        !tokenList?.length ||
        !coinsMap ||
        !pool ||
        !coinsMap[coin1.type]?.balance ||
        !coinsMap[coin2.type]?.balance
      )
        return;

      if (isSui(coin1.type)) {
        if (
          +Number(coin1.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[coin1.type].balance,
            coinsMap[coin1.type].decimals
          ).toFixed(5)
        ) {
          setValue(
            'error',
            `The ${coin1.symbol} amount is superior than your balance, try to reduce`
          );
          return;
        }

        if (
          +Number(coin1.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[coin1.type].balance.minus(100_000_000),
            coinsMap[coin1.type].decimals
          ).toFixed(5)
        ) {
          setValue(
            'error',
            `The ${coin1.symbol} amount is superior than safe balance, try to leave at least 0.1 MOVE`
          );
          return;
        }
      }

      if (
        +Number(coin1.value).toFixed(5) >
        +FixedPointMath.toNumber(
          coinsMap[coin1.type].balance,
          coinsMap[coin1.type].decimals
        ).toFixed(5)
      ) {
        setValue(
          'error',
          `The ${coin1.symbol} amount is superior than your balance, try to reduce`
        );
        return;
      }

      if (isSui(coin2.type)) {
        if (
          +Number(coin2.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[coin2.type].balance,
            coinsMap[coin2.type].decimals
          ).toFixed(5)
        ) {
          setValue(
            'error',
            `The ${coin2.symbol} amount is superior than your balance, try to reduce`
          );
          return;
        }

        if (
          +Number(coin2.value).toFixed(5) >
          +FixedPointMath.toNumber(
            coinsMap[coin2.type].balance.minus(100_000_000),
            coinsMap[coin2.type].decimals
          ).toFixed(5)
        ) {
          setValue(
            'error',
            `The ${coin2.symbol} amount is superior than safe balance, try to leave at least 0.1 MOVE`
          );
          return;
        }
      }

      if (
        +Number(coin2.value).toFixed(5) >
        +FixedPointMath.toNumber(
          coinsMap[coin2.type].balance,
          coinsMap[coin2.type].decimals
        ).toFixed(5)
      ) {
        setValue(
          'error',
          `The ${coin2.symbol} amount is superior than your balance, try to reduce`
        );
        return;
      }
    }
    setValue('error', null);
  }, [tokenList]);

  const error = useWatch({ control, name: 'error' });

  const addDeposit = () =>
    !error &&
    ableToClick &&
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview getValues={getValues} onSubmit={onDeposit} isDeposit />
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
      width="max-content"
      onClick={addDeposit}
      disabled={!!error || !ableToClick}
    >
      Deposit
    </Button>
  );
};

export default PoolFormDepositButton;
