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
import { pathOr } from 'ramda';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AIRDROP_SEND_CONTRACT, TREASURY } from '@/constants';
import { SUI_TYPE_ARG_LONG } from '@/constants/coins';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks/use-web3';
import {
  getCoins,
  noop,
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

      if (token.type === SUI_TYPE_ARG || token.type === SUI_TYPE_ARG_LONG) {
        const txb = new TransactionBlock();

        const totalAmount = airdropList
          .reduce((acc, data) => BigNumber(data.amount).plus(acc), BigNumber(0))
          .decimalPlaces(0)
          .toString();

        const [coinToSend, fee] = txb.splitCoins(txb.gas, [
          txb.pure(totalAmount),
          txb.pure(
            new BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS)
              .times(airdropList.length)
              .decimalPlaces(0)
              .toString()
          ),
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

        throwTXIfNotSuccessful(tx);

        showTXSuccessToast(tx, network);

        let firstCoinObjectId = '';
        let nextDigest = '';
        let nextVersion = '';
        tx.objectChanges!.forEach((objectChanged: any) => {
          if (
            objectChanged.objectType === `0x2::coin::Coin<${SUI_TYPE_ARG}>` &&
            objectChanged.type === 'created' &&
            normalizeSuiAddress(
              pathOr('', ['owner', 'AddressOwner'], objectChanged)
            ) === normalizeSuiAddress(currentAccount.address)
          ) {
            firstCoinObjectId = objectChanged.objectId;
            nextDigest = objectChanged.digest;
            nextVersion = objectChanged.version;
          }
        });

        await sleep(RATE_LIMIT_DELAY);

        for (const [index, batch] of Object.entries(list)) {
          const txb = new TransactionBlock();

          const tx = await sendAirdrop({
            suiClient,
            batch,
            txb,
            coinToSend: txb.objectRef({
              digest: nextDigest,
              objectId: firstCoinObjectId,
              version: nextVersion,
            }),
            currentAccount,
            signTransactionBlock,
            tokenType: token.type,
            contractPackageId,
          });

          [nextDigest, nextVersion] = findNextVersionAndDigest(
            tx,
            firstCoinObjectId
          );

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

      if (otherCoins.length > 0) {
        const txb = new TransactionBlock();

        txb.mergeCoins(
          txb.object(firstCoin.coinObjectId),
          otherCoins.map((coin) => coin.coinObjectId)
        );

        const tx = await signAndExecute({
          suiClient,
          txb,
          currentAccount,
          signTransactionBlock,
        });

        throwTXIfNotSuccessful(tx);

        showTXSuccessToast(tx, network);

        await sleep(RATE_LIMIT_DELAY);
      }

      let nextDigest = firstCoin.digest;
      let nextVersion = firstCoin.version;

      for (const [index, batch] of Object.entries(list)) {
        const txb = new TransactionBlock();

        chargeFee(txb, batch.length);

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
