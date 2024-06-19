import { Button } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
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
import { useWeb3 } from '@/hooks/use-web3';
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
  const signTxb = useSignTransaction();
  const currentAccount = useCurrentAccount();
  const { dialog, handleClose } = useDialog();
  const createStablePool = useCreateStablePool();
  const createVolatilePool = useCreateVolatilePool();
  const { control } = useFormContext<CreatePoolForm>();
  const { mutate } = useWeb3();

  const form = useWatch({ control });

  const onCreatePool = async () => {
    invariant(form && form.tokens?.length, 'No data');
    invariant(currentAccount, 'No wallet');

    const lpCoinTx = await createLpCoin(form.tokens as ReadonlyArray<Token>);

    const lpCoinTx2 = await signAndExecute({
      tx: lpCoinTx,
      currentAccount,
      suiClient: client,
      signTransaction: signTxb,
    });

    const { treasuryCap, coinType } = await extractCoinData(lpCoinTx2, client);

    const tx = await (form.isStable ? createStablePool : createVolatilePool)(
      form.tokens as ReadonlyArray<Token>,
      treasuryCap,
      coinType
    );

    const tx2 = await signAndExecute({
      tx,
      currentAccount,
      suiClient: client,
      signTransaction: signTxb,
    });

    throwTXIfNotSuccessful(tx2);

    const poolId = await extractPoolDataFromTx(tx2, client);

    await clamm.savePool(poolId);

    showTXSuccessToast(tx2, network as Network);

    await client.waitForTransaction({
      digest: tx2.digest,
      timeout: 10000,
      pollInterval: 500,
    });

    mutate();

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
