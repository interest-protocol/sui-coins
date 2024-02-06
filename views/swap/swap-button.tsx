import { Button, Typography } from '@interest-protocol/ui-kit';
import {
  TransactionBlock,
  TransactionResult,
} from '@mysten/sui.js/transactions';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { useFormContext, UseFormReturn, useWatch } from 'react-hook-form';

import { EXPLORER_URL, OBJECT_RECORD } from '@/constants';
import { REGISTRY_POOLS } from '@/constants/dex';
import { useNetwork } from '@/context/network';
import { useDialog } from '@/hooks/use-dialog';
import { useSuiClient } from '@/hooks/use-sui-client';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import {
  createObjectsParameter,
  throwTXIfNotSuccessful,
  ZERO_BIG_NUMBER,
} from '@/utils';
import { SwapForm } from '@/views/swap/swap.types';

import { getAmountMinusSlippage } from './swap.utils';

const SwapButton = () => {
  const client = useSuiClient();
  const { network } = useNetwork();
  const { dialog, handleClose } = useDialog();
  const formSwap: UseFormReturn<SwapForm> = useFormContext();
  const [loading, setLoading] = useState(false);
  const { signTransactionBlock } = useWalletKit();
  const { account, coinsMap, mutate } = useWeb3();

  const resetInput = () => {
    formSwap.setValue('from.value', '0');
    formSwap.setValue('to.value', '0');
  };

  const [explorerLink, setExplorerLink] = useState('');

  const gotoExplorer = () =>
    window.open(explorerLink, '_blank', 'noopener,noreferrer');

  const tokenIn = useWatch({ control: formSwap.control, name: 'from' });

  const notEnoughBalance = FixedPointMath.toBigNumber(
    tokenIn.value,
    tokenIn.decimals
  )
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .gt(BigNumber(coinsMap[tokenIn.type]?.balance) ?? ZERO_BIG_NUMBER);

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
        ? BigNumber(coinsMap[to.type]?.balance) ?? ZERO_BIG_NUMBER
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
          const poolId =
            REGISTRY_POOLS[network][coinInType][coinOutType].poolId;

          // FirstSwap
          if (index === 0) {
            const coinIn = txb.moveCall({
              target: `${OBJECT_RECORD[network].UTILS_PACKAGE_ID}::utils::handle_coin_vector`, // Utils package ID
              typeArguments: [from.type],
              arguments: [
                txb.makeMoveVec({
                  objects: coinInList,
                }),
                txb.pure(amount),
              ],
            });

            nextCoin = txb.moveCall({
              target: `${OBJECT_RECORD[network].DEX_PACKAGE_ID}::sui_coins_amm::swap`,
              typeArguments: [coinInType, coinOutType, lpCoinType],
              arguments: [
                txb.object(poolId),
                coinIn,
                txb.pure(numberOfSwaps === 0 ? minAmountOut.toString() : '0'),
              ],
            });
          } else {
            nextCoin = txb.moveCall({
              target: `${OBJECT_RECORD[network].DEX_PACKAGE_ID}::sui_coins_amm::swap`,
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

      setExplorerLink(`${EXPLORER_URL[network]}/txblock/${tx.digest}`);
    } finally {
      resetInput();
      setLoading(false);
      await mutate();
    }
  };

  const swap = () => {
    dialog.promise(handleSwap(), {
      loading: {
        title: 'Swapping...',
        message: 'We are swapping, and you will let you know when it is done',
      },
      success: {
        onClose: handleClose,
        title: 'Swap Successfully',
        message:
          'Your swap was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      },
      error: {
        onClose: handleClose,
        title: 'Swap Failure',
        message:
          'Your swap failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      },
    });
  };

  return (
    <Button disabled={notEnoughBalance} variant="filled" onClick={swap}>
      <Typography variant="label" size="large">
        {loading ? 'Swapping...' : 'Swap'}
      </Typography>
    </Button>
  );
};

export default SwapButton;
