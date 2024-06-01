import { useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { useFormContext } from 'react-hook-form';

import { PACKAGES } from '@/constants';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { createObjectsParameter, getSafeValue, ZERO_BIG_NUMBER } from '@/utils';

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

const swap = async ({
  currentAccount,
  coinsMap,
  formSwap,
  network,
  isZeroSwap = false,
}: SwapArgs) => {
  const { from, to, routeWithAmount, poolsMap, settings } =
    formSwap.getValues();

  if (!poolsMap) throw new Error('Pools map is missing');

  if (!routeWithAmount.length) throw new Error('There is no market');

  if (!to.type || !from.type) throw new Error('No tokens selected');

  if (!currentAccount) throw new Error('No account');

  if (!+from.value) throw new Error('Cannot swap zero coins');

  const isMaxTrade = formSwap.getValues('maxValue');

  const fromValue = isZeroSwap ? (+from.value * 0.05).toString() : from.value;

  const walletCoin = coinsMap[from.type];

  const safeAmount = getSafeValue({
    coinValue: from.value,
    coinType: from.type,
    decimals: from.decimals,
    balance: walletCoin.balance,
  });

  const amount = isMaxTrade
    ? coinsMap[from.type]
      ? BigNumber(coinsMap[from.type].balance)
      : ZERO_BIG_NUMBER
    : FixedPointMath.toBigNumber(fromValue, from.decimals).decimalPlaces(
        0,
        BigNumber.ROUND_DOWN
      );

  const amountIn = safeAmount.gt(amount) ? safeAmount : amount;

  const amountOut = FixedPointMath.toBigNumber(
    to.value,
    to.decimals
  ).decimalPlaces(0, BigNumber.ROUND_DOWN);

  const minAmountOut = getAmountMinusSlippage(amountOut, settings.slippage);

  console.log({
    amountOut: amountOut.toString(),
    amountOutAfterSlippage: minAmountOut.toString(),
  });

  const txb = new TransactionBlock();

  const coinInList = createObjectsParameter({
    coinsMap,
    txb,
    type: from.type,
    amount: amountIn.toString(),
  });

  const coinIn = txb.moveCall({
    target: `${PACKAGES[network].UTILS}::utils::handle_coin_vector`,
    typeArguments: [from.type],
    arguments: [
      txb.makeMoveVec({ objects: coinInList }),
      txb.pure.u64(amountIn.toString()),
    ],
  });

  let assetIn = coinIn;

  const [coinsPath, idsPath] = routeWithAmount;

  idsPath.forEach((id, index) => {
    const isFirstCall = index === 0;
    const isLastCall = index + 1 === idsPath.length;
    const poolMetadata = poolsMap[id];

    if (isLastCall || (isFirstCall && isLastCall)) {
      assetIn = txb.moveCall({
        target: `${PACKAGES[network].DEX}::interest_protocol_amm::swap`,
        typeArguments: [
          coinsPath[index],
          coinsPath[index + 1],
          poolMetadata.coinTypes.lpCoin,
        ],
        arguments: [
          txb.object(id),
          txb.object(SUI_CLOCK_OBJECT_ID),
          assetIn,
          txb.pure.u64('0'),
        ],
      });

      return;
    }

    assetIn = txb.moveCall({
      target: `${PACKAGES[network].DEX}::interest_protocol_amm::swap`,
      typeArguments: [
        coinsPath[index],
        coinsPath[index + 1],
        poolMetadata.coinTypes.lpCoin,
      ],
      arguments: [
        txb.object(id),
        txb.object(SUI_CLOCK_OBJECT_ID),
        assetIn,
        txb.pure.u64('0'),
      ],
    });
  });

  txb.transferObjects([assetIn], txb.pure.address(currentAccount.address));

  return txb;
};
