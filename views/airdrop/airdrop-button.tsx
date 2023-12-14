import { Box, Button } from '@interest-protocol/ui-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { useGetAllCoins } from 'hooks/use-get-all-coins';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AIRDROP_SEND_CONTRACT } from '@/constants';
import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';
import { FixedPointMath } from '@/lib';
import { sleep, throwTXIfNotSuccessful } from '@/utils';
import { createObjectsParameter, splitArray } from '@/utils';

import { BATCH_SIZE, RATE_LIMIT_DELAY } from './airdrop.constants';
import { IAirdropForm } from './airdrop.types';

const AirdropButton: FC<{ onSend: () => void }> = ({ onSend }) => {
  const { control, getValues, setValue } = useFormContext<IAirdropForm>();

  const { data } = useGetAllCoins();
  const { airdropList, token } = useWatch({ control });
  const { network } = useNetwork();
  const suiClient = useSuiClient();
  const { signTransactionBlock } = useWalletKit();
  const isDisabled =
    !airdropList ||
    !token?.balance ||
    token.balance <
      FixedPointMath.toNumber(
        airdropList?.reduce(
          (acc, { amount }) => acc.plus(BigNumber(amount ?? 0)),
          BigNumber(0)
        ),
        token.decimals
      );

  const handleSend = async () => {
    onSend();

    try {
      const { airdropList, token } = getValues();

      if (!airdropList || !data || !data[token.type]) return;

      const contractPackageId = AIRDROP_SEND_CONTRACT[network];

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

          await sleep(RATE_LIMIT_DELAY);
        }

        return;
      }

      const firstCoin = data[token.type].objects[0];

      // There are other coins
      if (data[token.type].objects.length > 1) {
        const txb = new TransactionBlock();

        const coinInList = createObjectsParameter({
          coinsMap: data,
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

        throwTXIfNotSuccessful(tx);

        await sleep(RATE_LIMIT_DELAY);

        for await (const [index, batch] of Object.entries(list)) {
          const totalAMount = batch
            .reduce(
              (acc, data) => acc.plus(BigNumber(data.amount)),
              BigNumber(0)
            )
            .toString();

          const txb = new TransactionBlock();

          const coinToSend = txb.splitCoins(
            txb.object(firstCoin.coinObjectId),
            [totalAMount]
          );

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

          await sleep(RATE_LIMIT_DELAY);

          setValue('done', [...getValues('done'), Number(index)]);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('finally');
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button disabled={isDisabled} variant="filled" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default AirdropButton;
