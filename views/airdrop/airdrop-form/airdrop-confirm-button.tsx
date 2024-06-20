import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { SuiObjectChangeCreated } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AIRDROP_SEND_CONTRACT, Network, TREASURY } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
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
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();
  const { getValues, setValue } = useFormContext<IAirdropForm>();

  const handleSend = async () => {
    setIsProgressView(true);

    try {
      const { airdropList, token } = getValues();

      if (!airdropList || !coinsMap || !coinsMap[token.type] || !currentAccount)
        return;

      const contractPackageId = AIRDROP_SEND_CONTRACT[network as Network];

      const list = splitArray(airdropList, BATCH_SIZE);

      const totalAmount = airdropList
        .reduce((acc, data) => BigNumber(data.amount).plus(acc), BigNumber(0))
        .decimalPlaces(0);

      const feeAmount = BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS)
        .times(airdropList.length)
        .decimalPlaces(0);

      if (isSui(token.type)) {
        const tx = new Transaction();

        const [coinToSend, fee] = tx.splitCoins(tx.gas, [
          tx.pure.u64(totalAmount.toString()),
          tx.pure.u64(feeAmount.toString()),
        ]);

        tx.transferObjects(
          [coinToSend],
          tx.pure.address(currentAccount.address)
        );
        tx.transferObjects([fee], tx.pure.address(TREASURY));

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

        showTXSuccessToast(tx2, network as Network);

        const [gasCoin, spendCoin] =
          (tx2.objectChanges as Array<SuiObjectChangeCreated>)!.reduce(
            suiObjectReducer(currentAccount.address),
            []
          );

        await pauseUtilNextTx(initTransferTxMS);

        for (const [index, batch] of Object.entries(list)) {
          const tx = new Transaction();

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

          const nextSpendInfo = findNextVersionAndDigest(
            tx2,
            spendCoin.objectId
          );

          gasCoin.digest = nextGasInfo[0];
          gasCoin.version = nextGasInfo[1];

          spendCoin.digest = nextSpendInfo[0];
          spendCoin.version = nextSpendInfo[1];

          throwTXIfNotSuccessful(tx2, () =>
            setValue('failed', [...getValues('failed'), Number(index)])
          );

          setValue('done', [...getValues('done'), Number(index)]);

          showTXSuccessToast(tx2, network as Network);

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

      const [fee] = tx.splitCoins(tx.gas, [tx.pure.u64(feeAmount.toString())]);

      tx.transferObjects([fee], tx.pure.address(TREASURY));

      const tx2 = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
        options: { showObjectChanges: true },
      });

      const initMergeAndSplitTxMS = Date.now();

      throwTXIfNotSuccessful(tx2, () => setValue('error', true));

      showTXSuccessToast(tx2, network as Network);

      if (mergeCoinsPred)
        [nextDigest, nextVersion] = findNextVersionAndDigest(
          tx2,
          firstCoin.coinObjectId
        );

      const [gasCoin] =
        (tx2.objectChanges as Array<SuiObjectChangeCreated>)!.reduce(
          suiObjectReducer(currentAccount.address),
          []
        );

      await pauseUtilNextTx(initMergeAndSplitTxMS);

      let { digest: nextGasDigest, version: nextGasVersion } = gasCoin;

      for (const [index, batch] of Object.entries(list)) {
        const tx = new Transaction();

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

        console.log({ gas });

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

        [nextDigest, nextVersion] = findNextVersionAndDigest(
          tx2,
          firstCoin.coinObjectId
        );

        [nextGasDigest, nextGasVersion] = findNextVersionAndDigest(
          tx2,
          gasCoin.objectId
        );

        throwTXIfNotSuccessful(tx2, () =>
          setValue('failed', [...getValues('failed'), Number(index)])
        );

        showTXSuccessToast(tx2, network as Network);

        setValue('done', [...getValues('done'), Number(index)]);

        await pauseUtilNextTx(initAirdropTxMS);
      }
    } catch (e: any) {
      console.log({ e });
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
