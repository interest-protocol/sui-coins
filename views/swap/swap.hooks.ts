import { useCurrentAccount } from '@mysten/dapp-kit';
import {
  TransactionBlock,
  TransactionResult,
} from '@mysten/sui.js/transactions';
import BigNumber from 'bignumber.js';
import { useFormContext } from 'react-hook-form';

import { PACKAGES } from '@/constants';
import { REGISTRY_POOLS } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { createObjectsParameter, ZERO_BIG_NUMBER } from '@/utils';

import { SwapArgs, SwapForm } from './swap.types';
import { getAmountMinusSlippage } from './swap.utils';

export const useSwap = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();

  return () =>
    swap({
      currentAccount,
      coinsMap,
      formSwap,
      network,
    });
};

export const useZeroSwap = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const currentAccount = useCurrentAccount();
  const formSwap = useFormContext<SwapForm>();

  return () =>
    swap({
      currentAccount,
      coinsMap,
      formSwap,
      network,
      isZeroSwap: true,
    });
};

const swap = ({
  currentAccount,
  coinsMap,
  formSwap,
  network,
  isZeroSwap = false,
}: SwapArgs) => {
  const { settings, from, to, swapPath } = formSwap.getValues();

  if (!swapPath.length) throw new Error('There is no market');

  if (!to.type || !from.type) throw new Error('No tokens selected');

  if (!currentAccount) throw new Error('No account');

  if (!+from.value) throw new Error('Cannot swap zero coins');

  const isMaxTrade = formSwap.getValues('maxValue');

  const fromValue = isZeroSwap ? (+from.value * 0.05).toString() : from.value;

  const amount = isMaxTrade
    ? coinsMap[to.type]
      ? BigNumber(coinsMap[to.type].balance)
      : ZERO_BIG_NUMBER
    : FixedPointMath.toBigNumber(fromValue, from.decimals).decimalPlaces(
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
            txb.makeMoveVec({ objects: coinInList }),
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
            txb.pure(numberOfSwaps === index ? minAmountOut.toString() : '0'),
          ],
        });
      }
    }
  );

  txb.transferObjects([nextCoin!], currentAccount.address);

  return txb;
};
