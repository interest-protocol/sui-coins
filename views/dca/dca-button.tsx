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

import { ExplorerMode } from '@/constants';
import { DELEGATEE, SENTINEL_API_URI } from '@/constants/dca';
import { DCA_FEE_PERCENTAGE } from '@/constants/fees';
import { useFeeFreeTokens } from '@/hooks/use-dca';
import useDcaSdk from '@/hooks/use-dca-sdk';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import {
  getCoinOfValue,
  getObjectIdsFromTxResult,
  signAndExecute,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';

import SuccessModal from '../components/success-modal';
import SuccessModalTokenCard from '../components/success-modal/success-modal-token-card';
import { LOCAL_STORAGE_TOP_KEY } from '../send/send.data';
import { DCAMessagesEnum } from './dca.data';
import { Aggregator, DCAForm } from './dca.types';

const DCAButton: FC = () => {
  const dcaSdk = useDcaSdk();
  const network = useNetwork();
  const suiClient = useSuiClient();
  const formDCA = useFormContext<DCAForm>();
  const currentAccount = useCurrentAccount();
  const getExplorerUrl = useGetExplorerUrl();
  const { dialog, handleClose } = useDialog();
  const signTransaction = useSignTransaction();
  const { data, isLoading, error } = useFeeFreeTokens();
  const aggregator =
    useReadLocalStorage<Aggregator>(
      `${LOCAL_STORAGE_TOP_KEY}-suicoins-dca-aggregator`
    ) ?? Aggregator.Aftermath;

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
      const {
        to,
        from,
        intervals,
        orders,
        periodicity,
        min,
        max,
        customRecipientAddress: recipient,
        isToCustomRecipient,
      } = formDCA.getValues();

      invariant(currentAccount, 'Need to connect wallet');

      formDCA.setValue('starting', true);

      const amountPerTrade = FixedPointMath.toNumber(
        from.value.div(orders),
        from.decimals
      );

      const initTx = new Transaction();

      const coinIn = await getCoinOfValue({
        suiClient,
        tx: initTx,
        coinType: from.type,
        account: currentAccount.address,
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
        witnessType: WITNESSES.WHITELIST_ADAPTER,
        fee: data?.includes(to.type) ? 0 : DCA_FEE_PERCENTAGE,
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

      const tx = isToCustomRecipient
        ? dcaSdk.newAndShareWithRecipient({ ...args, recipient })
        : dcaSdk.newAndShare(args);

      const txResult = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
      });

      throwTXIfNotSuccessful(txResult);
      formDCA.setValue('executionTime', txResult.time);

      const dcaId = getObjectIdsFromTxResult(txResult, 'created');

      const body = JSON.stringify({
        dcaId,
        inputCoinType: from.type,
        outputCoinType: to.type,
        aggregator: aggregator ?? Aggregator.Aftermath,
        ...(recipient && { recipient }),
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
        getExplorerUrl(txResult.digest, ExplorerMode.Transaction)
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
        title: 'DCA Created',
        message: (
          <SuccessModal
            transactionTime={`${+(
              formDCA.getValues('executionTime') / 1000
            ).toFixed(2)}`}
          >
            <SuccessModalTokenCard
              withoutAmount
              to={formDCA.getValues('to')}
              from={formDCA.getValues('from')}
            />
          </SuccessModal>
        ),
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: {
          label: 'got it',
          onClick: handleClose,
        },
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
