import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress, SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AIRDROP_SEND_CONTRACT } from '@/constants';
import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';
import { useWeb3 } from '@/hooks/use-web3';
import { showTXSuccessToast, sleep, throwTXIfNotSuccessful } from '@/utils';
import { splitArray } from '@/utils';

import { BATCH_SIZE, RATE_LIMIT_DELAY } from '../airdrop.constants';
import { AirdropConfirmButtonProps, IAirdropForm } from '../airdrop.types';

const AirdropConfirmButton: FC<AirdropConfirmButtonProps> = ({
  setIsProgressView,
}) => {
  const { coinsMap } = useWeb3();
  const { getValues, setValue } = useFormContext<IAirdropForm>();

  const { network } = useNetwork();
  const suiClient = useSuiClient();
  const { signTransactionBlock } = useWalletKit();

  const handleSend = async () => {
    setIsProgressView(true);

    try {
      const { airdropList, token } = getValues();

      if (!airdropList || !coinsMap || !coinsMap[token.type]) return;

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

          showTXSuccessToast(tx, network);

          await sleep(RATE_LIMIT_DELAY);
        }

        return;
      }

      const firstCoin = coinsMap[token.type].objects[0];

      for await (const [index, batch] of Object.entries(list)) {
        const txb = new TransactionBlock();

        // There are other coins
        if (+index === 0 && coinsMap[token.type].objects.length > 1) {
          const coinInList = coinsMap[token.type]
            ? coinsMap[token.type].objects
                .slice(1)
                .map((x) => txb.object(x.coinObjectId))
            : [];

          txb.moveCall({
            target: '0x2::pay::join_vec',
            typeArguments: [token.type],
            arguments: [
              txb.object(firstCoin.coinObjectId),
              txb.makeMoveVec({
                objects: coinInList,
              }),
            ],
          });
        }

        const totalAMount = batch
          .reduce((acc, data) => acc.plus(BigNumber(data.amount)), BigNumber(0))
          .toString();

        console.log('totalAmount', totalAMount.toString());

        const coinToSend = txb.splitCoins(txb.object(firstCoin.coinObjectId), [
          txb.pure(totalAMount),
        ]);

        console.log('Coin to send', coinToSend);

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

        console.log('signed');

        const tx = await suiClient.executeTransactionBlock({
          transactionBlock: transactionBlockBytes,
          signature,
          options: { showEffects: true },
          requestType: 'WaitForEffectsCert',
        });

        console.log('TX', tx);

        throwTXIfNotSuccessful(tx, () =>
          setValue('failed', [...getValues('failed'), Number(index)])
        );

        await sleep(RATE_LIMIT_DELAY);

        await showTXSuccessToast(tx, network);

        setValue('done', [...getValues('done'), Number(index)]);
      }
    } catch (e: any) {
      console.log('ERROR', e);
      toast.error((e?.message as string) ?? e ?? 'Something went wrong!');
      if (((e?.message as string) ?? e) === 'Rejected from user') {
        setValue('error', true);
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        width="100%"
        display="flex"
        variant="filled"
        onClick={handleSend}
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
