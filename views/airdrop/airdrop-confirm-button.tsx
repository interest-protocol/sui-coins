import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress, SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { EXPLORER_URL, PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { useMovementClient } from '@/hooks';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import {
  createObjectsParameter,
  showTXSuccessToast,
  sleep,
  throwTXIfNotSuccessful,
} from '@/utils';
import { splitArray } from '@/utils';

import { BATCH_SIZE, RATE_LIMIT_DELAY } from './airdrop.constants';
import { AirdropProgressProps, IAirdropForm } from './airdrop.types';

const AirdropConfirmButton: FC<AirdropProgressProps> = ({
  setIsProgressView,
}) => {
  const { control, getValues, setValue } = useFormContext<IAirdropForm>();
  const { currentAccount } = useWalletKit();
  const { coinsMap } = useWeb3();
  const { airdropList, token } = useWatch({ control });
  const { network } = useNetwork();
  const suiClient = useMovementClient();
  const { signTransactionBlock } = useWalletKit();

  const amountList = airdropList
    ? FixedPointMath.toNumber(
        airdropList?.reduce(
          (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
          BigNumber(0)
        ),
        token?.decimals || 0
      )
    : 0;

  const isDisabled =
    !airdropList || !token?.balance || token.balance < amountList;

  const handleSend = async () => {
    setIsProgressView(true);

    try {
      const { airdropList, token } = getValues();

      if (!airdropList || !coinsMap || !coinsMap[token.type]) return;

      const contractPackageId = PACKAGES[network].AIRDROP;

      const list = splitArray(airdropList, BATCH_SIZE);

      if (token.type === SUI_TYPE_ARG) {
        for await (const [index, batch] of Object.entries(list)) {
          const totalAMount = batch
            .reduce(
              (acc, data) => acc.plus(BigNumber(data.amount)),
              BigNumber(0)
            )
            .toString();

          const txb = new TransactionBlock();

          const [coinToSend] = txb.splitCoins(txb.gas, [
            txb.pure(totalAMount.toString()),
          ]);

          txb.moveCall({
            target: `${contractPackageId}::airdrop::send`,
            typeArguments: [token.type],
            arguments: [
              coinToSend,
              txb.pure(batch.map((x) => x.address)),
              txb.pure(batch.map((x) => x.amount)),
            ],
          });
          const { signature, transactionBlockBytes } =
            await signTransactionBlock({
              transactionBlock: txb,
            });

          const tx = await suiClient.executeTransactionBlock({
            transactionBlock: transactionBlockBytes,
            signature,
            options: { showEffects: true },
            requestType: 'WaitForEffectsCert',
          });

          throwTXIfNotSuccessful(tx, () =>
            setValue('failed', [...getValues('failed'), Number(index)])
          );

          setValue('done', [...getValues('done'), Number(index)]);

          showTXSuccessToast(tx, network);

          await sleep(RATE_LIMIT_DELAY);
        }

        return;
      }

      const firstCoin = coinsMap[token.type].objects[0];

      // There are other coins
      if (coinsMap[token.type].objects.length > 1) {
        const txb = new TransactionBlock();

        const coinInList = createObjectsParameter({
          coinsMap,
          txb: txb,
          type: token.type,
          amount: airdropList
            .reduce(
              (acc, data) => acc.plus(BigNumber(data.amount)),
              BigNumber(0)
            )
            .toString(),
        });

        txb.moveCall({
          target: '0x2::pay::join_vec',
          typeArguments: [token.type],
          arguments: [
            txb.object(firstCoin.coinObjectId),
            txb.makeMoveVec({
              objects: coinInList.slice(1),
            }),
          ],
        });

        const { signature, transactionBlockBytes } = await signTransactionBlock(
          {
            transactionBlock: txb,
          }
        );

        const tx = await suiClient.executeTransactionBlock({
          transactionBlock: transactionBlockBytes,
          signature,
          options: { showEffects: true },
          requestType: 'WaitForEffectsCert',
        });

        throwTXIfNotSuccessful(tx, () => {
          setValue('error', true);
        });

        showTXSuccessToast(tx, network);

        await sleep(RATE_LIMIT_DELAY);
      }

      for await (const [index, batch] of Object.entries(list)) {
        const totalAMount = batch
          .reduce((acc, data) => acc.plus(BigNumber(data.amount)), BigNumber(0))
          .toString();

        const txb = new TransactionBlock();

        const coinToSend = txb.splitCoins(txb.object(firstCoin.coinObjectId), [
          totalAMount,
        ]);

        txb.moveCall({
          target: `${contractPackageId}::airdrop::send`,
          typeArguments: [token.type],
          arguments: [
            coinToSend,
            txb.pure(batch.map((x) => normalizeSuiAddress(x.address))),
            txb.pure(batch.map((x) => x.amount)),
          ],
        });
        const { signature, transactionBlockBytes } = await signTransactionBlock(
          {
            transactionBlock: txb,
          }
        );

        const tx = await suiClient.executeTransactionBlock({
          transactionBlock: transactionBlockBytes,
          signature,
          options: { showEffects: true },
          requestType: 'WaitForEffectsCert',
        });

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
    } finally {
      const explorerLink = EXPLORER_URL[network](
        `address/${currentAccount!.address}`
      );

      toast(
        <a target="_blank" rel="noreferrer nofollow" href={explorerLink}>
          <Typography
            size="medium"
            variant="label"
            cursor="pointer"
            textDecoration="underline"
            color="onSurface"
          >
            Explorer
          </Typography>
        </a>
      );
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        width="100%"
        display="flex"
        variant="filled"
        onClick={handleSend}
        disabled={isDisabled}
        borderRadius="0.5rem"
        justifyContent="center"
      >
        <Typography variant="label" size="large">
          Confirm airdrop
        </Typography>
      </Button>
    </Box>
  );
};

export default AirdropConfirmButton;
