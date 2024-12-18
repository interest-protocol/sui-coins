import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiObjectChangeCreated } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { path } from 'ramda';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AIRDROP_SEND_CONTRACT, Network, TREASURY } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import {
  getCoins,
  isSui,
  noop,
  pauseUtilNextTx,
  showTXSuccessToast,
  signAndExecute,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';
import { splitArray } from '@/utils';
import {
  findNextVersionAndDigest,
  sendAirdrop,
  suiObjectReducer,
} from '@/views/airdrop/airdrop-form/txb-utils';

import { BATCH_SIZE } from '../../airdrop.constants';
import {
  AirdropConfirmButtonProps,
  IAirdropForm,
  ResultCoins,
} from '../../airdrop.types';

const feeFree = JSON.parse(process.env.NEXT_PUBLIC_FEE_FREE ?? 'false');

const AirdropConfirmButton: FC<AirdropConfirmButtonProps> = ({
  setIsProgressView,
}) => {
  const network = useNetwork();
  const { query } = useRouter();
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const { handleClose } = useModal();
  const getExplorerUrl = useGetExplorerUrl();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { getValues, setValue } = useFormContext<IAirdropForm>();

  const handleSend = async () => {
    setIsProgressView(true);
    handleClose();

    try {
      const { airdropList, token, method } = getValues();

      const feePerAddress =
        feeFree && query['discount'] === 'free'
          ? 0
          : AIRDROP_SUI_FEE_PER_ADDRESS * (method === 'suiPlay' ? 0.5 : 1);

      if (!airdropList || !coinsMap || !coinsMap[token.type] || !currentAccount)
        return;

      const contractPackageId = AIRDROP_SEND_CONTRACT[network as Network];

      const list = splitArray(airdropList, BATCH_SIZE);

      const totalAmount = airdropList
        .reduce((acc, data) => BigNumber(data.amount).plus(acc), BigNumber(0))
        .decimalPlaces(0);

      const feeAmount = BigNumber(feePerAddress)
        .times(airdropList.length)
        .decimalPlaces(0);

      if (isSui(token.type)) {
        const tx = new Transaction();

        const [coinToSend, fee] = tx.splitCoins(tx.gas, [
          tx.pure.u64(totalAmount.toString()),
          tx.pure.u64(feeAmount.toString()),
        ]);

        tx.transferObjects(
          [coinToSend, fee],
          tx.pure.address(currentAccount.address)
        );

        const tx2 = await signAndExecute({
          suiClient,
          tx,
          currentAccount,
          signTransaction,
          options: {
            showObjectChanges: true,
          },
        });

        const initTransferTxMS = Date.now();

        throwTXIfNotSuccessful(tx2, () => setValue('error', true));

        showTXSuccessToast(
          tx2,
          getExplorerUrl,
          'Initial TX completed successfully'
        );

        const coins =
          (tx2.objectChanges as Array<SuiObjectChangeCreated>)!.reduce(
            suiObjectReducer(currentAccount.address),
            []
          );

        const coinsObject = await suiClient.multiGetObjects({
          ids: coins.map(({ objectId }) => objectId),
          options: { showContent: true },
        });

        const { gasCoin, spendCoin, feeCoin } = coinsObject.reduce(
          (acc, curr, index) => {
            const balance = path(
              ['data', 'content', 'fields', 'balance'],
              curr
            );

            return {
              ...acc,
              [balance === totalAmount.toString()
                ? 'spendCoin'
                : balance === feeAmount.toString()
                  ? 'feeCoin'
                  : 'gasCoin']: coins[index],
            };
          },
          {} as ResultCoins
        );

        await pauseUtilNextTx(initTransferTxMS);

        for (const [index, batch] of Object.entries(list)) {
          const tx = new Transaction();

          const fee = tx.splitCoins(tx.objectRef(feeCoin), [
            tx.pure.u64(
              BigNumber(feePerAddress)
                .times(batch.length)
                .decimalPlaces(0)
                .toString()
            ),
          ]);

          tx.transferObjects([fee], tx.pure.address(TREASURY));

          tx.setGasPayment([gasCoin]);

          const tx2 = await sendAirdrop({
            tx,
            batch,
            suiClient,
            currentAccount,
            contractPackageId,
            signTransaction,
            tokenType: token.type,
            coinToSend: tx.objectRef(spendCoin),
          });

          const initAirdropTxMS = Date.now();

          const nextGasInfo = findNextVersionAndDigest(tx2, gasCoin.objectId);
          const nextFeeInfo = findNextVersionAndDigest(tx2, feeCoin.objectId);
          const nextSpendInfo = findNextVersionAndDigest(
            tx2,
            spendCoin.objectId
          );

          gasCoin.digest = nextGasInfo[0];
          gasCoin.version = nextGasInfo[1];

          feeCoin.digest = nextFeeInfo[0];
          feeCoin.version = nextFeeInfo[1];

          spendCoin.digest = nextSpendInfo[0];
          spendCoin.version = nextSpendInfo[1];

          throwTXIfNotSuccessful(tx2, () =>
            setValue('failed', [...getValues('failed'), Number(index)])
          );

          setValue('done', [...getValues('done'), Number(index)]);

          showTXSuccessToast(
            tx2,
            getExplorerUrl,
            `Batch ${Number(index) + 1} was completed successfully`
          );

          await pauseUtilNextTx(initAirdropTxMS);
        }

        return;
      }

      const [firstCoin, ...otherCoins] = await getCoins({
        suiClient,
        coinType: token.type,
        cursor: null,
        account: currentAccount.address,
      });

      const mergeCoinsPred = !!otherCoins.length;

      let { digest: nextDigest, version: nextVersion } = firstCoin;

      const tx = new Transaction();

      if (mergeCoinsPred)
        tx.mergeCoins(
          tx.object(firstCoin.coinObjectId),
          otherCoins.map((coin) => coin.coinObjectId)
        );

      const [fees] = tx.splitCoins(tx.gas, [tx.pure.u64(feeAmount.toString())]);

      tx.transferObjects([fees], tx.pure.address(currentAccount.address));

      const tx2 = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
        options: { showObjectChanges: true },
      });

      const initMergeAndSplitTxMS = Date.now();

      throwTXIfNotSuccessful(tx2, () => setValue('error', true));

      showTXSuccessToast(
        tx2,
        getExplorerUrl,
        'Initial TX completed successfully'
      );

      if (mergeCoinsPred)
        [nextDigest, nextVersion] = findNextVersionAndDigest(
          tx2,
          firstCoin.coinObjectId
        );

      const coins =
        (tx2.objectChanges as Array<SuiObjectChangeCreated>)!.reduce(
          suiObjectReducer(currentAccount.address),
          []
        );

      console.log({ coins });

      const coinsObject = await suiClient.multiGetObjects({
        ids: coins.map(({ objectId }) => objectId),
        options: { showContent: true },
      });

      const { gasCoin, feeCoin } = coinsObject.reduce((acc, curr, index) => {
        const balance = path(['data', 'content', 'fields', 'balance'], curr);

        return {
          ...acc,
          [balance === feeAmount.toString() ? 'feeCoin' : 'gasCoin']:
            coins[index],
        };
      }, {} as ResultCoins);

      await pauseUtilNextTx(initMergeAndSplitTxMS);

      let { digest: nextGasDigest, version: nextGasVersion } = gasCoin;

      for (const [index, batch] of Object.entries(list)) {
        const tx = new Transaction();

        const fee = tx.splitCoins(tx.objectRef(feeCoin), [
          tx.pure.u64(
            BigNumber(feePerAddress)
              .times(batch.length)
              .decimalPlaces(0)
              .toString()
          ),
        ]);

        tx.transferObjects([fee], tx.pure.address(TREASURY));

        const coin = {
          digest: nextDigest,
          objectId: firstCoin.coinObjectId,
          version: nextVersion,
        };

        const gas = {
          digest: nextGasDigest,
          objectId: gasCoin.objectId,
          version: nextGasVersion,
        };

        tx.setGasPayment([gas]);

        const tx2 = await sendAirdrop({
          tx,
          batch,
          suiClient,
          currentAccount,
          contractPackageId,
          signTransaction,
          tokenType: token.type,
          coinToSend: tx.objectRef(coin),
        });

        const initAirdropTxMS = Date.now();

        const [nextFeeDigest, nextFeeVersion] = findNextVersionAndDigest(
          tx2,
          feeCoin.objectId
        );

        feeCoin.digest = nextFeeDigest;
        feeCoin.version = nextFeeVersion;

        [nextDigest, nextVersion] = findNextVersionAndDigest(
          tx2,
          firstCoin.coinObjectId
        );

        [nextGasDigest, nextGasVersion] = findNextVersionAndDigest(
          tx2,
          gasCoin.objectId
        );

        const feeInfoRaw = await suiClient.getObject({
          id: gasCoin.objectId,
          options: { showContent: true },
        });

        const feeBalance = path(
          ['data', 'content', 'fields', 'balance'],
          feeInfoRaw
        );

        console.log('>> fee after load :: ', feeBalance);

        throwTXIfNotSuccessful(tx2, () =>
          setValue('failed', [...getValues('failed'), Number(index)])
        );

        showTXSuccessToast(
          tx2,
          getExplorerUrl,
          `Batch ${Number(index) + 1} was completed successfully`
        );

        setValue('done', [...getValues('done'), Number(index)]);

        await pauseUtilNextTx(initAirdropTxMS);
      }
    } catch (e: any) {
      handleClose();
      toast.error((e?.message as string) ?? e ?? 'Something went wrong!');
      if (((e?.message as string) ?? e) === 'Rejected from user') {
        setValue('error', true);
      }
    }
  };

  const airdropList = getValues('airdropList');

  const airdropFee =
    !airdropList || (feeFree && query['discount'] === 'free')
      ? ZERO_BIG_NUMBER
      : BigNumber(
          AIRDROP_SUI_FEE_PER_ADDRESS *
            (getValues('method') === 'suiPlay' ? 0.5 : 1)
        ).times(airdropList.length);

  const disabled = airdropFee.gt(
    coinsMap[SUI_TYPE_ARG]?.balance ?? ZERO_BIG_NUMBER
  );

  return (
    <Box display="flex" justifyContent="center">
      <Button
        width="100%"
        display="flex"
        variant="filled"
        disabled={disabled}
        borderRadius="0.5rem"
        justifyContent="center"
        onClick={disabled ? noop : handleSend}
      >
        <Typography variant="label" size="large">
          Confirm airdrop
        </Typography>
      </Button>
    </Box>
  );
};

export default AirdropConfirmButton;
