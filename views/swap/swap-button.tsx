import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import {
  TransactionBlock,
  TransactionResult,
} from '@mysten/sui.js/transactions';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';

import { REGISTRY_POOLS } from '@/constants/coins';
import { PACKAGES } from '@/constants/packages';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import {
  createObjectsParameter,
  showTXSuccessToast,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { getAmountMinusSlippage } from './swap.utils';

const SwapButton = () => {
  const { network } = useNetwork();
  const formSwap: UseFormReturn<SwapForm> = useFormContext();
  const [loading, setLoading] = useState(false);
  const { account, coinsMap, mutate } = useWeb3();
  const client = useSuiClient();
  const signTransactionBlock = useSignTransactionBlock();
  const currentAccount = useCurrentAccount();
  const { handleClose } = useModal();

  const resetInput = () => {
    formSwap.setValue('from.value', '0');
    formSwap.setValue('to.value', '0');
  };

  const handleSwap = async () => {
    try {
      setLoading(true);

      const { settings, from, to, swapPath } = formSwap.getValues();

      if (!swapPath.length) throw new Error('There is no market');

      if (!to.type || !from.type) throw new Error('No tokens selected');

      if (!account || !currentAccount) throw new Error('No account');

      if (!+from.value) throw new Error('Cannot swap zero coins');

      const isMaxTrade = formSwap.getValues('maxValue');

      const amount = isMaxTrade
        ? coinsMap[to.type]
          ? BigNumber(coinsMap[to.type].balance)
          : ZERO_BIG_NUMBER
        : FixedPointMath.toBigNumber(from.value, from.decimals).decimalPlaces(
            0,
            BigNumber.ROUND_DOWN
          );

      const amountOut = FixedPointMath.toBigNumber(
        to.value,
        to.decimals
      ).decimalPlaces(0, BigNumber.ROUND_DOWN);

      const minAmountOut = getAmountMinusSlippage(amountOut, settings.slippage);

      const txb = new TransactionBlock();

      const coinInList = createObjectsParameter({
        coinsMap,
        txb,
        type: from.type,
        amount: amount.toString(),
      });

      let nextCoin: null | TransactionResult = null;
      const numberOfSwaps = swapPath.length;

      swapPath.forEach(
        (
          { coinIn: coinInType, coinOut: coinOutType, lpCoin: lpCoinType },
          index
        ) => {
          const poolId = REGISTRY_POOLS[coinInType][coinOutType].poolId;

          // FirstSwap
          if (index === 0) {
            const coinIn = txb.moveCall({
              target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
              typeArguments: [from.type],
              arguments: [
                txb.makeMoveVec({
                  objects: coinInList,
                }),
                txb.pure(amount),
              ],
            });

            nextCoin = txb.moveCall({
              target: `${PACKAGES[network].DEX}::interest_protocol_amm::swap`,
              typeArguments: [coinInType, coinOutType, lpCoinType],
              arguments: [
                txb.object(poolId),
                coinIn,
                txb.pure(numberOfSwaps === 0 ? minAmountOut.toString() : '0'),
              ],
            });
          } else {
            nextCoin = txb.moveCall({
              target: `${PACKAGES[network].DEX}::interest_protocol_amm::swap`,
              typeArguments: [coinInType, coinOutType, lpCoinType],
              arguments: [
                txb.object(poolId),
                nextCoin!,
                txb.pure(
                  numberOfSwaps === index ? minAmountOut.toString() : '0'
                ),
              ],
            });
          }
        }
      );

      txb.transferObjects([nextCoin!], account);

      const { signature, transactionBlockBytes } =
        await signTransactionBlock.mutateAsync({
          transactionBlock: txb,
          account: currentAccount,
        });

      const tx = await client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(tx, network);
    } finally {
      resetInput();
      setLoading(false);
      handleClose();
      await mutate();
    }
  };

  const swap = () => {
    toast.promise(handleSwap(), {
      loading: 'Loading',
      success: `Swapped successfully`,
      error: 'Failed to swap',
    });
  };

  return (
    <Button variant="filled" onClick={swap} justifyContent="center">
      <Typography variant="label" size="large">
        {loading ? 'Swapping...' : 'Confirm Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
