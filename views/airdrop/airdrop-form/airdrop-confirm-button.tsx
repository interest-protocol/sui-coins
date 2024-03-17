import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useSuiClient } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress, SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AIRDROP_SEND_CONTRACT, TREASURY } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { useNetwork } from '@/context/network';
import useSignTxb from '@/hooks/use-sign-txb';
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

  const network = useNetwork();
  const suiClient = useSuiClient();

  const signTransactionBlock = useSignTxb();

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

          const [fee] = txb.splitCoins(txb.gas, [
            txb.pure(
              new BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS)
                .times(batch.length)
                .toString()
            ),
          ]);

          txb.transferObjects([fee], txb.pure(TREASURY));

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
            await signTransactionBlock({ transactionBlock: txb });

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
          txb.moveCall({
            target: '0x2::pay::join_vec',
            typeArguments: [token.type],
            arguments: [
              txb.object(firstCoin.coinObjectId),
              txb.makeMoveVec({
                objects: coinsMap[token.type]
                  ? coinsMap[token.type].objects
                      .slice(1)
                      .map((x) => txb.object(x.coinObjectId))
                  : [],
              }),
            ],
          });
        }

        const totalAMount = batch
          .reduce((acc, data) => acc.plus(BigNumber(data.amount)), BigNumber(0))
          .toString();

        const coinToSend = txb.splitCoins(txb.object(firstCoin.coinObjectId), [
          txb.pure(totalAMount),
        ]);

        const [fee] = txb.splitCoins(txb.gas, [
          txb.pure(
            new BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS)
              .times(batch.length)
              .toString()
          ),
        ]);

        txb.transferObjects([fee], txb.pure(TREASURY));

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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
