import { Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { reverse } from 'ramda';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL, Routes, RoutesEnum } from '@/constants';
import { useNetwork } from '@/context/network';
import { useDialog } from '@/hooks';
import { signAndExecute, throwTXIfNotSuccessful } from '@/utils';

import { useCreateAmmPool, useCreateLpCoin } from '../pool-create.hooks';
import { CreatePoolForm } from '../pool-create.types';
import {
  extractCoinDataFromTx,
  extractPoolDataFromTx,
  isPoolsCoinsOrdered,
  logCreatePool,
} from '../pool-create.utils';

const PoolSummaryButton: FC = () => {
  const network = useNetwork();
  const { push } = useRouter();
  const suiClient = useSuiClient();
  const createLpCoin = useCreateLpCoin();
  const createAmmPool = useCreateAmmPool();
  const signTxb = useSignTransactionBlock();
  const currentAccount = useCurrentAccount();
  const { dialog, handleClose } = useDialog();
  const { getValues, resetField, setValue } = useFormContext<CreatePoolForm>();

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    resetField('explorerLink');
  };

  const onCreatePool = async () => {
    const { tokens, isStable, type } = getValues();

    invariant(type === 'AMM', 'Pool is not valid');
    invariant(currentAccount, 'You must login in your wallet');

    const isOrdered = await isPoolsCoinsOrdered(tokens, suiClient, network);

    const orderedTokens = isOrdered ? tokens : reverse(tokens);

    const txbLpCoin = await createLpCoin(orderedTokens, isStable);

    const txLpCoin = await signAndExecute({
      suiClient,
      currentAccount,
      txb: txbLpCoin,
      signTransactionBlock: signTxb,
    });

    throwTXIfNotSuccessful(txLpCoin);

    const { treasuryCap, coinType } = await extractCoinDataFromTx(
      txLpCoin,
      suiClient
    );

    invariant(treasuryCap, 'Error on load Treasury cap');

    const txb = await createAmmPool(
      orderedTokens,
      coinType,
      treasuryCap,
      isStable
    );

    const tx = await signAndExecute({
      txb,
      suiClient,
      currentAccount,
      signTransactionBlock: signTxb,
    });

    throwTXIfNotSuccessful(tx);

    setValue('explorerLink', EXPLORER_URL[network](`txblock/${tx.digest}`));

    const poolId = await extractPoolDataFromTx(tx, suiClient, network);

    await fetch('/api/auth/v1/save-pool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        poolId,
        network,
      }),
    });

    push(`${Routes[RoutesEnum.PoolDetails]}?objectId=${poolId}`);

    logCreatePool(
      currentAccount.address,
      tokens[0],
      tokens[1],
      network,
      tx.digest
    );
  };

  const createPool = () =>
    dialog.promise(onCreatePool(), {
      loading: {
        title: 'Create the pool...',
        message: 'We are creating the pool, and you will know when it is done',
      },
      success: {
        title: 'Pool created successfully',
        message:
          'Your pool was create successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: () => {
            gotoExplorer();
            handleClose();
          },
        },
      },
      error: {
        title: 'Pool creation failed',
        message:
          'Your pool was not created, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
    });

  return (
    <Button variant="filled" onClick={createPool}>
      Create Pool
    </Button>
  );
};

export default PoolSummaryButton;
