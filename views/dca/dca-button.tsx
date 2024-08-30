import { WITNESSES } from '@interest-protocol/dca-sdk';
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
import { useReadLocalStorage } from 'usehooks-ts';

import { EXPLORER_URL, Network } from '@/constants';
import { DELEGATEE } from '@/constants/dca';
import { EXCHANGE_FEE_PERCENTAGE } from '@/constants/fees';
import useDcaSdk from '@/hooks/use-dca-sdk';
import { useDialog } from '@/hooks/use-dialog';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import {
  coinOfValue,
  getObjectIdsFromTxResult,
  signAndExecute,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';

import { LOCAL_STORAGE_TOP_KEY } from '../send/send.data';
import { DCAMessagesEnum } from './dca.data';
import { Aggregator, DCAForm } from './dca.types';

const DCAButton: FC = () => {
  const dcaSdk = useDcaSdk();
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const formDCA = useFormContext<DCAForm>();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const { dialog, handleClose } = useDialog();
  const signTransaction = useSignTransaction();
  const aggregator = useReadLocalStorage<Aggregator>(
    `${LOCAL_STORAGE_TOP_KEY}-suicoins-dca-aggregator`
  );

  const resetInput = () => {
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
      const { to, from, intervals, orders, periodicity, min, max } =
        formDCA.getValues();

      invariant(currentAccount, 'Need to connect wallet');

      formDCA.setValue('starting', true);

      const amountPerTrade = FixedPointMath.toNumber(
        from.value.div(orders),
        from.decimals
      );

      const initTx = new Transaction();

      const coinIn = coinOfValue({
        coinsMap,
        tx: initTx,
        coinType: from.type,
        coinValue: from.value.toString(),
      });

      const args = {
        coinIn,
        tx: initTx,
        delegatee: DELEGATEE,
        coinOutType: to.type,
        coinInType: from.type,
        timeScale: periodicity,
        every: Number(intervals),
        fee: EXCHANGE_FEE_PERCENTAGE,
        numberOfOrders: Number(orders),
        witnessType: WITNESSES.testnet.WHITELIST_ADAPTER,
        ...(Number(min) && {
          min: BigInt(
            FixedPointMath.toBigNumber(min, to.decimals)
              .times(amountPerTrade)
              .decimalPlaces(0)
              .toString()
          ),
        }),
        ...(Number(max) && {
          max: BigInt(
            FixedPointMath.toBigNumber(max, to.decimals)
              .times(amountPerTrade)
              .decimalPlaces(0)
              .toString()
          ),
        }),
      };

      const tx = dcaSdk.newAndShare(args);

      const txResult = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      throwTXIfNotSuccessful(txResult);

      const dcaId = getObjectIdsFromTxResult(txResult, 'created');

      const body = JSON.stringify({
        dcaId,
        inputCoinType: from.type,
        outputCoinType: to.type,
        aggregator: aggregator ?? Aggregator.Aftermath,
      });

      console.log('>> create endpoint will call ', body);

      formDCA.setValue(
        'explorerLink',
        `${EXPLORER_URL[network as Network]}/tx/${txResult.digest}`
      );
    } finally {
      resetInput();
      formDCA.setValue('starting', false);
    }
  };

  const onStartDCA = () =>
    dialog.promise(handleStartDCA(), {
      loading: () => ({
        title: 'Starting DCA...',
        message: DCAMessagesEnum.starting,
      }),
      error: () => ({
        title: 'DCA Failure',
        message: DCAMessagesEnum.dcaFailure,
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
      success: () => ({
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
      }),
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
