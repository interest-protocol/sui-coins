import { Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { Network, Routes, RoutesEnum } from '@/constants';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useDialog } from '@/hooks/use-dialog';
import {
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
} from '@/utils';

import {
  useCreateLpCoin,
  useCreateStablePool,
  useCreateVolatilePool,
} from '../pool-create.hooks';
import { CreatePoolForm, Token } from '../pool-create.types';
import { extractCoinData, extractPoolDataFromTx } from '../pool-create.utils';

const PoolSummaryButton: FC = () => {
  const { push } = useRouter();
  const client = useSuiClient();
  const clamm = useClammSdk();
  const { network } = useSuiClientContext();
  const createLpCoin = useCreateLpCoin();
  const signTxb = useSignTransactionBlock();
  const currentAccount = useCurrentAccount();
  const { dialog, handleClose } = useDialog();
  const createStablePool = useCreateStablePool();
  const createVolatilePool = useCreateVolatilePool();
  const { control } = useFormContext<CreatePoolForm>();

  const form = useWatch({ control });

  const onCreatePool = async () => {
    invariant(form && form.tokens?.length, 'No data');
    invariant(currentAccount, 'No wallet');

    const lpCoinTxb = await createLpCoin(form.tokens as ReadonlyArray<Token>);

    const { signature: lpCoinSignature, transactionBlockBytes: lpCoinBytes } =
      await signTxb.mutateAsync({
        transactionBlock: lpCoinTxb,
      });

    const lpCoinTx = await client.executeTransactionBlock({
      signature: lpCoinSignature,
      transactionBlock: lpCoinBytes,
      options: {
        showEffects: true,
      },
      requestType: 'WaitForLocalExecution',
    });

    const { treasuryCap, coinType } = await extractCoinData(lpCoinTx, client);

    const txb = await (form.isStable ? createStablePool : createVolatilePool)(
      form.tokens as ReadonlyArray<Token>,
      treasuryCap,
      coinType
    );

    const tx = await signAndExecute({
      txb,
      suiClient: client,
      currentAccount,
      signTransactionBlock: signTxb,
    });

    throwTXIfNotSuccessful(tx);

    const poolId = await extractPoolDataFromTx(tx, client, network as Network);

    await clamm.savePool(poolId);

    showTXSuccessToast(tx, network as Network);

    push(`${Routes[RoutesEnum.PoolDetails]}?objectId=${poolId}`);
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
          onClick: handleClose,
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
