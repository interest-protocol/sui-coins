import { Button } from '@interest-protocol/ui-kit';
import { useSignTransactionBlock, useSuiClient } from '@mysten/dapp-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { useDialog } from '@/hooks/use-dialog';
import { showTXSuccessToast, throwTXIfNotSuccessful } from '@/utils';

import {
  useCreateLpCoin,
  useCreateStablePool,
  useCreateVolatilePool,
} from '../pool-create.hooks';
import { CreatePoolForm, Token } from '../pool-create.types';
import { extractCoinData } from '../pool-create.utils';

const PoolSummaryButton: FC = () => {
  const network = useNetwork();
  const client = useSuiClient();
  const signTxb = useSignTransactionBlock();
  const { dialog, handleClose } = useDialog();
  const createLpCoin = useCreateLpCoin();
  const createStablePool = useCreateStablePool();
  const createVolatilePool = useCreateVolatilePool();
  const { control } = useFormContext<CreatePoolForm>();

  const form = useWatch({ control });

  const onCreatePool = async () => {
    try {
      if (!form || !form.tokens?.length) throw new Error('No data');

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

      const { signature, transactionBlockBytes } = await signTxb.mutateAsync({
        transactionBlock: txb,
      });

      const tx = await client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
      });

      throwTXIfNotSuccessful(tx);

      showTXSuccessToast(tx, network);
    } catch (e) {
      console.log(e);
      throw e;
    }
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
