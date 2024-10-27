import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { normalizeStructTag } from '@mysten/sui/utils';
import invariant from 'tiny-invariant';

import {
  CLAMM_PACKAGE_ADDRESSES,
  COIN_TO_WRAPPED,
  SCALLOP_WRAPPED_COINS_TREASURY_CAPS,
} from '@/constants/clamm';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useNetwork } from '@/hooks/use-network';

import { getCoinOfValue } from './../../utils/coin/index';
import { SwapForm } from './swap.types';
import { isNativeRoute } from './swap.utils';
import { useAftermathRouter } from './swap-manager/swap-manager.hooks';

export const useSwap = () => {
  const clamm = useClammSdk();
  const suiClient = useSuiClient();
  const afRouter = useAftermathRouter();
  const currentAccount = useCurrentAccount();
  const network = useNetwork();
  const pkgs = CLAMM_PACKAGE_ADDRESSES[network];

  return async (values: SwapForm): Promise<Transaction> => {
    invariant(values.route && currentAccount, 'Something went wrong');

    if (!isNativeRoute(values.route)) {
      return afRouter.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: values.route,
        slippage: Number(values.settings.slippage) / 100,
      });
    }

    // Native Swap - Interest

    const route = values.route.routes[0];

    const auxTx = new Transaction();

    let coinIn;

    const splittedCoin = await getCoinOfValue({
      suiClient,
      tx: auxTx,
      coinType: values.from.type,
      coinValue: values.from.value.toString(),
      account: currentAccount.address,
    });

    const wrappedFromCoin =
      COIN_TO_WRAPPED[network][normalizeStructTag(values.from.type)];

    if (wrappedFromCoin) {
      const cap = SCALLOP_WRAPPED_COINS_TREASURY_CAPS[network][wrappedFromCoin];

      const coinOut = auxTx.moveCall({
        target: `${pkgs.SCALLOP_COINS_WRAPPER}::wrapped_scoin::mint`,
        typeArguments: [values.from.type, wrappedFromCoin],
        arguments: [auxTx.object(cap), splittedCoin],
      });

      coinIn = coinOut;
    } else coinIn = splittedCoin;

    const { coinOut, tx } = clamm.swapRoute({
      coinIn,
      tx: auxTx as any,
      route: [route[0], route[1]],
      poolsMap: values.route.poolsMap,
      slippage: Number((+values.settings.slippage * 100).toFixed(0)),
    });

    const wrappedToCoin =
      COIN_TO_WRAPPED[network][normalizeStructTag(values.to.type)];

    if (wrappedToCoin) {
      const cap =
        SCALLOP_WRAPPED_COINS_TREASURY_CAPS[network][
          normalizeStructTag(wrappedToCoin)
        ];

      const coinY = tx.moveCall({
        target: `${pkgs.SCALLOP_COINS_WRAPPER}::wrapped_scoin::burn`,
        typeArguments: [normalizeStructTag(values.to.type), wrappedToCoin],
        arguments: [tx.object(cap), coinOut],
      });

      tx.transferObjects([coinY], tx.pure.address(currentAccount.address));
    } else {
      tx.transferObjects([coinOut], tx.pure.address(currentAccount.address));
    }

    return tx as unknown as Transaction;
  };
};
