import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL, Network } from '@/constants';
import useDcaSdk from '@/hooks/use-dca-sdk';
import { useDialog } from '@/hooks/use-dialog';
import { getCoinOfValue, signAndExecute, ZERO_BIG_NUMBER } from '@/utils';
import { DCAForm } from '@/views/dca/dca.types';

import { DCAMessagesEnum } from './dca.data';

const WHITELIST_TESTNET_WITNESS =
  '0x5fee448eda1dd26b9fe1c8d72ee5228631c4b337c995d1e62dc8e61ef4aa30b9::whitelist_adapter::Whitelist';

const DCAButton: FC = () => {
  const dcaSdk = useDcaSdk();
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const formDCA = useFormContext<DCAForm>();
  const { dialog, handleClose } = useDialog();
  const signTransaction = useSignTransaction();

  const resetInput = () => {
    formDCA.setValue('to.display', '0');
    formDCA.setValue('from.display', '0');
    formDCA.setValue('from.value', ZERO_BIG_NUMBER);
  };

  const starting = useWatch({
    control: formDCA.control,
    name: 'starting',
  });

  const gotoExplorer = () => {
    window.open(
      formDCA.getValues('explorerLink'),
      '_blank',
      'noopener,noreferrer'
    );

    formDCA.setValue('explorerLink', '');
  };

  const handleStartDCA = async () => {
    try {
      const values = formDCA.getValues();

      invariant(currentAccount, 'Need to connect wallet');

      formDCA.setValue('starting', true);

      const initTx = new Transaction();

      const coinIn = await getCoinOfValue({
        suiClient,
        tx: initTx,
        account: currentAccount.address,
        coinType: values.from.type,
        coinValue: values.from.value.toString(),
      });

      const tx = dcaSdk.newAndShare({
        coinIn,
        tx: initTx as any,
        coinOutType: values.to.type,
        coinInType: values.from.type,
        timeScale: values.periodicity,
        every: Number(values.intervals),
        delegatee: currentAccount.address,
        numberOfOrders: Number(values.orders),
        witnessType: WHITELIST_TESTNET_WITNESS,
      }) as unknown as Transaction;

      const txResult = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      formDCA.setValue(
        'explorerLink',
        `${EXPLORER_URL[network as Network]}/tx/${txResult.digest}`
      );
    } catch (e) {
      console.log({ e });
      throw e;
    } finally {
      resetInput();
      formDCA.setValue('starting', false);
    }
  };

  const onStartDCA = () =>
    dialog.promise(handleStartDCA(), {
      loading: {
        title: 'Starting DCA...',
        message: DCAMessagesEnum.starting,
      },
      error: {
        title: 'DCA Failure',
        message: DCAMessagesEnum.dcaFailure,
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
      success: {
        title: 'DCA Successfully',
        message: DCAMessagesEnum.dcaSuccess,
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: (
          <Button variant="outline" mr="s" onClick={handleClose}>
            got it
          </Button>
        ),
      },
    });

  return (
    <Button onClick={onStartDCA} variant="filled" justifyContent="center">
      <Typography variant="label" size="large">
        {starting ? 'Loading...' : 'Start DCA'}
      </Typography>
    </Button>
  );
};

export default DCAButton;
