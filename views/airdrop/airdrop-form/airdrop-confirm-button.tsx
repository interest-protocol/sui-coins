import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiObjectChangeCreated } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { path } from 'ramda';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AIRDROP_SEND_CONTRACT, TREASURY } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { useNetwork } from '@/context/network';
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
  getCreatedCoinInfo,
  sendAirdrop,
  suiObjectIdsReducer,
} from '@/views/airdrop/airdrop-form/txb-utils';

import { BATCH_SIZE } from '../airdrop.constants';
import { AirdropConfirmButtonProps, IAirdropForm } from '../airdrop.types';

const AirdropConfirmButton: FC<AirdropConfirmButtonProps> = ({
  setIsProgressView,
}) => {
  const { coinsMap } = useWeb3();
  const { getValues, setValue } = useFormContext<IAirdropForm>();
  const network = useNetwork();
  const suiClient = useSuiClient();
  const signTransactionBlock = useSignTransactionBlock();
  const currentAccount = useCurrentAccount();

  const handleSend = async () => {
    setIsProgressView(true);

    try {
      const { airdropList, token } = getValues();

      if (!airdropList || !coinsMap || !coinsMap[token.type] || !currentAccount)
        return;

      const contractPackageId = AIRDROP_SEND_CONTRACT[network];

      const list = splitArray(airdropList, BATCH_SIZE);

      const totalAmount = airdropList
        .reduce((acc, data) => BigNumber(data.amount).plus(acc), BigNumber(0))
        .decimalPlaces(0);

      const feeAmount = BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS)
        .times(airdropList.length)
        .decimalPlaces(0);

      if (isSui(token.type)) {
        const txb = new TransactionBlock();

        const [coinToSend, fee] = txb.splitCoins(txb.gas, [
          txb.pure(totalAmount.toString()),
          txb.pure(feeAmount.toString()),
        ]);

        txb.transferObjects([coinToSend], txb.pure(currentAccount.address));
        txb.transferObjects([fee], txb.pure(TREASURY));

        const tx = await signAndExecute({
          suiClient,
          txb,
          currentAccount,
          signTransactionBlock,
          options: {
            showObjectChanges: true,
          },
        });
        const initTransferTxMS = Date.now();

        throwTXIfNotSuccessful(tx, () => setValue('error', true));

        showTXSuccessToast(tx, network);

        const suiCreatedIds: ReadonlyArray<string> =
          (tx.objectChanges as Array<SuiObjectChangeCreated>)!.reduce(
            suiObjectIdsReducer(currentAccount.address),
            []
          );

        const [coinObj1, coinObj2] = await Promise.all(
          suiCreatedIds.map((id) =>
            suiClient.getObject({
              id,
              options: {
                showContent: true,
              },
            })
          )
        );

        const isSendTheFirst =
          path(['data', 'content', 'fields', 'balance'], coinObj1) ===
          totalAmount.toString();

        const [spendCoin, gasCoin] = (
          isSendTheFirst ? [coinObj1, coinObj2] : [coinObj2, coinObj1]
        ).map((coinObj) => getCreatedCoinInfo(coinObj));

        console.log({ spendCoin, gasCoin });

        await pauseUtilNextTx(initTransferTxMS);

        for (const [index, batch] of Object.entries(list)) {
          const txb = new TransactionBlock();

          txb.setGasPayment([gasCoin]);

          const tx = await sendAirdrop({
            txb,
            batch,
            suiClient,
            currentAccount,
            contractPackageId,
            signTransactionBlock,
            tokenType: token.type,
            coinToSend: txb.objectRef(spendCoin),
          });
          const initAirdropTxMS = Date.now();

          const nextGasInfo = findNextVersionAndDigest(tx, gasCoin.objectId);

          const nextSpendInfo = findNextVersionAndDigest(
            tx,
            spendCoin.objectId
          );

          gasCoin.digest = nextGasInfo[0];
          gasCoin.version = nextGasInfo[1];

          spendCoin.digest = nextSpendInfo[0];
          spendCoin.version = nextSpendInfo[1];

          throwTXIfNotSuccessful(tx, () =>
            setValue('failed', [...getValues('failed'), Number(index)])
          );

          setValue('done', [...getValues('done'), Number(index)]);

          showTXSuccessToast(tx, network);

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

      let nextDigest = firstCoin.digest;
      let nextVersion = firstCoin.version;

      const txb = new TransactionBlock();

      if (mergeCoinsPred)
        txb.mergeCoins(
          txb.object(firstCoin.coinObjectId),
          otherCoins.map((coin) => coin.coinObjectId)
        );

      const [x, fee] = txb.splitCoins(txb.gas, [
        txb.pure(1n),
        txb.pure(feeAmount.toString()),
      ]);

      txb.transferObjects([x], txb.pure(currentAccount.address));
      txb.transferObjects([fee], txb.pure(TREASURY));

      const tx = await signAndExecute({
        txb,
        suiClient,
        currentAccount,
        signTransactionBlock,
        options: { showObjectChanges: true },
      });
      const initMergeAndSplitTxMS = Date.now();

      throwTXIfNotSuccessful(tx, () => setValue('error', true));

      showTXSuccessToast(tx, network);

      if (mergeCoinsPred)
        [nextDigest, nextVersion] = findNextVersionAndDigest(
          tx,
          firstCoin.coinObjectId
        );

      const suiCreatedIds: ReadonlyArray<string> =
        (tx.objectChanges as Array<SuiObjectChangeCreated>)!.reduce(
          suiObjectIdsReducer(currentAccount.address),
          []
        );

      const [coinObj1, coinObj2] = await Promise.all(
        suiCreatedIds.map((id) =>
          suiClient.getObject({
            id,
            options: {
              showContent: true,
            },
          })
        )
      );

      const firstGasCoin =
        path(['data', 'content', 'fields', 'balance'], coinObj1) === '1'
          ? coinObj2
          : coinObj1;

      await pauseUtilNextTx(initMergeAndSplitTxMS);

      let { digest: nextGasDigest, version: nextGasVersion } =
        firstGasCoin.data!;

      for (const [index, batch] of Object.entries(list)) {
        const txb = new TransactionBlock();

        const gas = {
          digest: nextGasDigest,
          objectId: firstGasCoin.data!.objectId,
          version: nextGasVersion,
        };

        const coin = {
          digest: nextDigest,
          objectId: firstCoin.coinObjectId,
          version: nextVersion,
        };

        txb.setGasPayment([gas]);

        const tx = await sendAirdrop({
          txb,
          batch,
          suiClient,
          currentAccount,
          contractPackageId,
          signTransactionBlock,
          tokenType: token.type,
          coinToSend: txb.objectRef(coin),
        });
        const initAirdropTxMS = Date.now();

        [nextDigest, nextVersion] = findNextVersionAndDigest(
          tx,
          firstCoin.coinObjectId
        );

        [nextGasDigest, nextGasVersion] = findNextVersionAndDigest(
          tx,
          firstGasCoin.data!.objectId
        );

        throwTXIfNotSuccessful(tx, () =>
          setValue('failed', [...getValues('failed'), Number(index)])
        );

        showTXSuccessToast(tx, network);

        setValue('done', [...getValues('done'), Number(index)]);

        await pauseUtilNextTx(initAirdropTxMS);
      }
    } catch (e: any) {
      toast.error((e?.message as string) ?? e ?? 'Something went wrong!');
      if (((e?.message as string) ?? e) === 'Rejected from user') {
        setValue('error', true);
      }
    }
  };
  const airdropList = getValues('airdropList');

  const airdropFee = airdropList
    ? BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS).times(airdropList.length)
    : ZERO_BIG_NUMBER;

  const disabled = airdropFee.gt(coinsMap[SUI_TYPE_ARG].balance);

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
