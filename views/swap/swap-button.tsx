import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  TransactionBlock,
  TransactionResult,
} from '@mysten/sui.js/transactions';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Network } from '@/constants';
import { REGISTRY_POOLS } from '@/constants/coins';
import { PACKAGES } from '@/constants/packages';
import { useMovementClient, useWeb3 } from '@/hooks';
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
  const formSwap: UseFormReturn<SwapForm> = useFormContext();
  const [loading, setLoading] = useState(false);
  const { signTransactionBlock } = useWalletKit();
  const { account, coinsMap, mutate } = useWeb3();
  const client = useMovementClient();

  const resetInput = () => {
    formSwap.setValue('from.value', '0');
    formSwap.setValue('to.value', '0');
  };

  const tokenIn = useWatch({ control: formSwap.control, name: 'from' });

  const notEnoughBalance = FixedPointMath.toBigNumber(
    tokenIn.value,
    tokenIn.decimals
  )
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .gt(coinsMap[tokenIn.type]?.totalBalance ?? ZERO_BIG_NUMBER);

  const handleSwap = async () => {
    try {
      setLoading(true);

      const { settings, from, to, swapPath } = formSwap.getValues();

      if (!swapPath.length) throw new Error('There is no market');

      if (!to.type || !from.type) throw new Error('No tokens selected');

      if (!account) throw new Error('No account');

      if (!+from.value) throw new Error('Cannot swap zero coins');

      const isMaxTrade = formSwap.getValues('maxValue');

      const amount = isMaxTrade
        ? coinsMap[to.type]?.totalBalance ?? ZERO_BIG_NUMBER
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
              target: `${PACKAGES.UTILS}::utils::handle_coin_vector`,
              typeArguments: [from.type],
              arguments: [
                txb.makeMoveVec({
                  objects: coinInList,
                }),
                txb.pure(amount),
              ],
            });

            nextCoin = txb.moveCall({
              target: `${PACKAGES.DEX}::sui_coins_amm::swap`,
              typeArguments: [coinInType, coinOutType, lpCoinType],
              arguments: [
                txb.object(poolId),
                coinIn,
                txb.pure(numberOfSwaps === 0 ? minAmountOut.toString() : '0'),
              ],
            });
          } else {
            nextCoin = txb.moveCall({
              target: `${PACKAGES.DEX}::sui_coins_amm::swap`,
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

      const { signature, transactionBlockBytes } = await signTransactionBlock({
        transactionBlock: txb,
      });

      const tx = await client.executeTransactionBlock({
        transactionBlock: transactionBlockBytes,
        signature,
        options: { showEffects: true },
        requestType: 'WaitForEffectsCert',
      });

      throwTXIfNotSuccessful(tx);

      await showTXSuccessToast(tx, Network.M2);
    } finally {
      resetInput();
      setLoading(false);
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
    <Button
      disabled={notEnoughBalance}
      variant="filled"
      onClick={async () => {
        await swap();
      }}
    >
      <Typography variant="label" size="large">
        {loading ? 'Swapping...' : 'Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
