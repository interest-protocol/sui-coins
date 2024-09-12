import { WITNESSES } from '@interest-protocol/dca-sdk';
import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';
import { useReadLocalStorage } from 'usehooks-ts';

import { EXPLORER_URL, Network } from '@/constants';
import { DELEGATEE, SENTINEL_API_URI } from '@/constants/dca';
import { EXCHANGE_FEE_PERCENTAGE } from '@/constants/fees';
import { useFeeFreeTokens } from '@/hooks/use-dca';
import useDcaSdk from '@/hooks/use-dca-sdk';
import { useDialog } from '@/hooks/use-dialog';
import { useNetwork } from '@/hooks/use-network';
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
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const { data, isLoading, error } = useFeeFreeTokens();
  const formDCA = useFormContext<DCAForm>();
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
    if (error || isLoading) return;

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
        numberOfOrders: Number(orders),
        fee: data?.includes(to.type) ? 0 : EXCHANGE_FEE_PERCENTAGE,
        witnessType:
          WITNESSES[network === Network.MAINNET ? 'mainnet' : 'testnet']
            .WHITELIST_ADAPTER,
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
        aggregator: aggregator ?? Aggregator.Hop,
      });

      await fetch(`${SENTINEL_API_URI[network]}dcas`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body,
      });

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
    <Button
      variant="filled"
      onClick={onStartDCA}
      justifyContent="center"
      disabled={isLoading || error}
    >
      <Typography variant="label" size="large">
        {starting ? 'Loading...' : 'Start DCA'}
      </Typography>
    </Button>
  );
};

export default DCAButton;
