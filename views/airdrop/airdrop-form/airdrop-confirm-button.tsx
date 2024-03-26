import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { path, pathOr } from 'ramda';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AIRDROP_SEND_CONTRACT, TREASURY } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';
import {
  getCoins,
  noop,
  normalizeSuiType,
  showTXSuccessToast,
  signAndExecute,
  sleep,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';
import { splitArray } from '@/utils';
import {
  chargeFee,
  findNextVersionAndDigest,
  sendAirdrop,
} from '@/views/airdrop/airdrop-form/txb-utils';

import { BATCH_SIZE, RATE_LIMIT_DELAY } from '../airdrop.constants';
import { AirdropConfirmButtonProps, IAirdropForm } from '../airdrop.types';

interface CoinInfo {
  digest: string;
  version: string;
  id: string;
}

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

      if (normalizeSuiType(token.type) === normalizeSuiType(SUI_TYPE_ARG)) {
        const txb = new TransactionBlock();
        const totalAmount = airdropList
          .reduce((acc, data) => BigNumber(data.amount).plus(acc), BigNumber(0))
          .decimalPlaces(0);

        const feeAmount = new BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS)
          .times(airdropList.length)
          .decimalPlaces(0);

        const remainingAmount = coinsMap[SUI_TYPE_ARG as string].balance
          .minus(totalAmount)
          .minus(feeAmount)
          .minus(BigNumber('500000000'));

        const [coinToSend, fee, gas] = txb.splitCoins(txb.gas, [
          txb.pure(totalAmount.toString()),
          txb.pure(feeAmount.toString()),
          txb.pure(remainingAmount.toString()),
        ]);

        txb.transferObjects([coinToSend], txb.pure(currentAccount.address));
        txb.transferObjects([gas], txb.pure(currentAccount.address));
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

        throwTXIfNotSuccessful(tx);

        showTXSuccessToast(tx, network);

        const coins: CoinInfo[] = [];
        tx.objectChanges!.forEach((objectChanged: any) => {
          console.log(objectChanged);
          if (
            objectChanged.type === 'created' &&
            normalizeSuiAddress(
              pathOr('', ['owner', 'AddressOwner'], objectChanged)
            ) === normalizeSuiAddress(currentAccount.address)
          )
            coins.push({
              id: objectChanged.objectId,
              version: objectChanged.version,
              digest: objectChanged.digest,
            });
        });

        const [coin1, coin2] = await Promise.all(
          coins.map((x) =>
            suiClient.getObject({
              id: x.id,
              options: {
                showContent: true,
              },
            })
          )
        );

        const isGasTheFirst =
          path(['data', 'content', 'fields', 'balance'], coin1) ===
          remainingAmount.toString();

        const gasCoin: CoinInfo = isGasTheFirst
          ? {
              id: path(['data', 'objectId'], coin1) as string,
              version: path(['data', 'version'], coin1) as string,
              digest: path(['data', 'digest'], coin1) as string,
            }
          : {
              id: path(['data', 'objectId'], coin2) as string,
              version: path(['data', 'version'], coin2) as string,
              digest: path(['data', 'digest'], coin2) as string,
            };

        const spendCoin: CoinInfo = isGasTheFirst
          ? {
              id: path(['data', 'objectId'], coin2) as string,
              version: path(['data', 'version'], coin2) as string,
              digest: path(['data', 'digest'], coin2) as string,
            }
          : {
              id: path(['data', 'objectId'], coin1) as string,
              version: path(['data', 'version'], coin1) as string,
              digest: path(['data', 'digest'], coin1) as string,
            };

        await sleep(RATE_LIMIT_DELAY);

        for (const [index, batch] of Object.entries(list)) {
          const txb = new TransactionBlock();

          txb.setGasPayment([
            {
              digest: gasCoin.digest,
              objectId: gasCoin.id,
              version: gasCoin.version,
            },
          ]);

          txb.setGasBudget(1_200_000_000n);

          const tx = await sendAirdrop({
            suiClient,
            batch,
            txb,
            coinToSend: txb.objectRef({
              digest: spendCoin.digest,
              objectId: spendCoin.id,
              version: spendCoin.version,
            }),
            currentAccount,
            signTransactionBlock,
            tokenType: token.type,
            contractPackageId,
          });

          const nextGasInfo = findNextVersionAndDigest(tx, gasCoin.id);

          const nextSpendInfo = findNextVersionAndDigest(tx, spendCoin.id);

          gasCoin.digest = nextGasInfo[0];
          gasCoin.version = nextGasInfo[1];

          spendCoin.digest = nextSpendInfo[0];
          spendCoin.version = nextSpendInfo[1];

          throwTXIfNotSuccessful(tx, () =>
            setValue('failed', [...getValues('failed'), Number(index)])
          );

          setValue('done', [...getValues('done'), Number(index)]);

          showTXSuccessToast(tx, network);

          await sleep(RATE_LIMIT_DELAY);
        }

        return;
      }

      const paginatedCoins = await getCoins({
        suiClient,
        coinType: token.type,
        cursor: null,
        account: currentAccount.address,
      });

      // Merge all coins into one
      const [firstCoin, ...otherCoins] = paginatedCoins;

      const [firstGasCoin, ...otherGasCoins] = await getCoins({
        suiClient,
        coinType: normalizeSuiType(SUI_TYPE_ARG),
        cursor: null,
        account: currentAccount.address,
      });

      const mergeCoinsPred = otherCoins.length > 0;
      const mergeGasPred = otherGasCoins.length > 0;

      let nextDigest = '';
      let nextVersion = '';

      let nextGasDigest = '';
      let nextGasVersion = '';

      if (mergeCoinsPred || mergeGasPred) {
        const txb = new TransactionBlock();

        if (mergeCoinsPred)
          txb.mergeCoins(
            txb.object(firstCoin.coinObjectId),
            otherCoins.map((coin) => coin.coinObjectId)
          );

        if (mergeGasPred)
          txb.mergeCoins(
            txb.object(firstGasCoin.coinObjectId),
            otherGasCoins.map((coin) => coin.coinObjectId)
          );

        const tx = await signAndExecute({
          suiClient,
          txb,
          currentAccount,
          signTransactionBlock,
        });

        throwTXIfNotSuccessful(tx);

        showTXSuccessToast(tx, network);

        [nextDigest, nextVersion] = findNextVersionAndDigest(
          tx,
          firstCoin.coinObjectId
        );

        [nextGasDigest, nextGasVersion] = findNextVersionAndDigest(
          tx,
          firstGasCoin.coinObjectId
        );

        await sleep(RATE_LIMIT_DELAY);
      }

      for (const [index, batch] of Object.entries(list)) {
        const txb = new TransactionBlock();

        if (index === '0') chargeFee(txb, airdropList.length);

        txb.setGasPayment([
          {
            digest: nextGasDigest,
            objectId: firstGasCoin.coinObjectId,
            version: nextGasVersion,
          },
        ]);

        txb.setGasBudget(1_200_000_000n);

        const tx = await sendAirdrop({
          suiClient,
          batch,
          txb,
          coinToSend: txb.objectRef({
            digest: nextDigest,
            objectId: firstCoin.coinObjectId,
            version: nextVersion,
          }),
          currentAccount,
          signTransactionBlock,
          tokenType: token.type,
          contractPackageId,
        });

        [nextDigest, nextVersion] = findNextVersionAndDigest(
          tx,
          firstCoin.coinObjectId
        );

        [nextGasDigest, nextGasVersion] = findNextVersionAndDigest(
          tx,
          firstGasCoin.coinObjectId
        );

        throwTXIfNotSuccessful(tx, () =>
          setValue('failed', [...getValues('failed'), Number(index)])
        );

        await sleep(RATE_LIMIT_DELAY);

        await showTXSuccessToast(tx, network);

        setValue('done', [...getValues('done'), Number(index)]);
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
