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
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PACKAGES } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { useNetwork } from '@/context/network';
import { useModal } from '@/hooks/use-modal';
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

import { BATCH_SIZE } from '../airdrop.constants';
import { AirdropConfirmButtonProps, IAirdropForm } from '../airdrop.types';

const AirdropConfirmButton: FC<AirdropConfirmButtonProps> = ({
  setIsProgressView,
}) => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const { handleClose } = useModal();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();
  const { getValues, setValue } = useFormContext<IAirdropForm>();

  const handleSend = async () => {
    handleClose();
    setIsProgressView(true);

    try {
      const { airdropList, token } = getValues();

      if (!airdropList || !coinsMap || !coinsMap[token.type] || !currentAccount)
        return;

      const contractPackageId = PACKAGES[network].AIRDROP;

      const list = splitArray(airdropList, BATCH_SIZE);

      const totalAmount = airdropList
        .reduce((acc, data) => BigNumber(data.amount).plus(acc), BigNumber(0))
        .decimalPlaces(0);

      if (isSui(token.type)) {
        const txb = new TransactionBlock();

        const [coinToSend] = txb.splitCoins(txb.gas, [
          txb.pure(totalAmount.toString()),
        ]);

        txb.transferObjects([coinToSend], txb.pure(currentAccount.address));

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

        const [gasCoin, spendCoin] =
          (tx.objectChanges as Array<SuiObjectChangeCreated>)!.reduce(
            suiObjectReducer(currentAccount.address),
            []
          );

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

      let { digest: nextDigest, version: nextVersion } = firstCoin;

      const txb = new TransactionBlock();

      if (mergeCoinsPred)
        txb.mergeCoins(
          txb.object(firstCoin.coinObjectId),
          otherCoins.map((coin) => coin.coinObjectId)
        );

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

      const [gasCoin] =
        (tx.objectChanges as Array<SuiObjectChangeCreated>)!.reduce(
          suiObjectReducer(currentAccount.address),
          []
        );

      await pauseUtilNextTx(initMergeAndSplitTxMS);

      let { digest: nextGasDigest, version: nextGasVersion } = gasCoin;

      for (const [index, batch] of Object.entries(list)) {
        const txb = new TransactionBlock();

        const gas = {
          digest: nextGasDigest,
          objectId: gasCoin.objectId,
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
          gasCoin.objectId
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
